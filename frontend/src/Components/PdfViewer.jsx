import { useState, useEffect, useContext } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker";
import AuthContext from "../Context/AuthContext";

const PdfViewer = ({ currPage = 1, pdfFile, onPdfProcessed, folderName }) => {
  
  let {user} = useContext(AuthContext)
  const [pdfDoc, setPdfDoc] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(currPage);
  const [pageImage, setPageImage] = useState(null);
  const [renderedPages, setRenderedPages] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    setCurrentPage(currPage);
  }, [currPage]);

  useEffect(() => {
    if (pdfFile) {
      handleFileChange(pdfFile);
    }
  }, [pdfFile]);

  useEffect(() => {
    if (pdfDoc && !renderedPages[currentPage]) {
      renderPage(currentPage + 1);
    } else {
      setPageImage(renderedPages[currentPage]);
    }
  }, [currentPage, pdfDoc, renderedPages]);

  const handleFileChange = async (pdfFile) => {
    if (!pdfFile) return;

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    let pdfData;
    if (typeof pdfFile === "string") {
      const response = await fetch(pdfFile);
      pdfData = await response.arrayBuffer();
    } else {
      const reader = new FileReader();
      reader.readAsArrayBuffer(pdfFile);
      pdfData = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
      });
    }

    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    setPdfDoc(pdf);
    setTotalPages(pdf.numPages);
    setCurrentPage(0);
    setRenderedPages({});
    
    // Process and upload all pages at once
    await processAllPages(pdf);
  };

  const processAllPages = async (pdf) => {
    setLoading(true);
    setUploadStatus("Processing PDF pages...");
    
    const totalPagesToProcess = pdf.numPages;
    const allPageImages = [];
    
    try {
      for (let pageNum = 1; pageNum <= totalPagesToProcess; pageNum++) {
        setUploadStatus(`Processing page ${pageNum} of ${totalPagesToProcess}...`);
        
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;
        const imgData = canvas.toDataURL("image/png");
        
        // Store for display
        const pageIndex = pageNum - 1;
        setRenderedPages((prev) => ({ ...prev, [pageIndex]: imgData }));
        
        // Add to array for backend upload
        allPageImages.push({
          pageNum: pageNum,
          imgData: imgData
        });
        
        // Set the first page as current page image
        if (pageNum === 1) {
          setPageImage(imgData);
        }
      }
      
      // Upload all images to backend
      await uploadImagesToBackend(allPageImages);
      
    } catch (error) {
      console.error("Error processing PDF:", error);
      setUploadStatus("Error processing PDF: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadImagesToBackend = async (pageImages) => {
    setUploadStatus("Uploading images to server...");
    
    try {
      const response = await fetch('/api/upload-pdf-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalPages: pageImages.length,
          images: pageImages,
          folderName: folderName,
          user:user.user_id
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setUploadStatus("Upload complete!");
      
      // Notify parent component if callback provided
      if (onPdfProcessed) {
        onPdfProcessed(data);
      }
      
    } catch (error) {
      console.error("Error uploading images:", error);
      setUploadStatus("Error uploading images: " + error.message);
    }
  };

  const renderPage = async (pageNum) => {
    if (!pdfDoc) return;

    setLoading(true);
    try {
      // Check if page is already rendered
      if (renderedPages[currentPage]) {
        setPageImage(renderedPages[currentPage]);
        return;
      }
      
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;
      const imgData = canvas.toDataURL("image/png");

      setPageImage(imgData);
      setRenderedPages((prev) => ({ ...prev, [currentPage]: imgData }));
    } catch (error) {
      console.error("Error rendering page:", error);
    } finally {
      setLoading(false);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {uploadStatus && (
        <div style={{ 
          margin: "10px 0", 
          padding: "10px", 
          backgroundColor: uploadStatus.includes("Error") ? "#ffebee" : "#e8f5e9",
          borderRadius: "5px" 
        }}>
          {uploadStatus}
        </div>
      )}
      
      {loading && !pageImage ? (
        <p style={{ fontSize: "18px", fontWeight: "bold", marginTop: "20px" }}>
          Loading...
        </p>
      ) : (
        pageImage && (
          <div>
            <img
              src={pageImage}
              alt={`Page ${currentPage + 1}`}
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "contain",
              }}
            />
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 0 || loading}
                style={buttonStyle}
              >
                Previous
              </button>
              <span style={{ margin: "0 10px" }}>
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1 || loading}
                style={buttonStyle}
              >
                Next
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

const buttonStyle = {
  padding: "10px 15px",
  margin: "5px",
  cursor: "pointer",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#007bff",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
};

export default PdfViewer;