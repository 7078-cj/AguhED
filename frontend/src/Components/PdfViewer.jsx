import { useState, useEffect, useContext } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker";
import AuthContext from "../Context/AuthContext";

const PdfViewer = ({ currPage = 1, pdfFile, onPdfProcessed, folderID }) => {
  let { user } = useContext(AuthContext);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(currPage);
  const [pageImage, setPageImage] = useState(null);
  const [renderedPages, setRenderedPages] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const renderPage = async (pageNum) => {
    if (!pdfDoc || renderedPages[pageNum - 1]) return;

    setLoading(true);
    try {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;

      const imgData = canvas.toDataURL("image/png");
      setRenderedPages((prev) => ({ ...prev, [pageNum - 1]: imgData }));
      setPageImage(imgData);
    } catch (error) {
      console.error("Error rendering page:", error);
    } finally {
      setLoading(false);
    }
  };

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

    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    try {
      let pdfData;
      if (typeof pdfFile === "string") {
        const response = await fetch(pdfFile);
        pdfData = await response.arrayBuffer();
      } else {
        pdfData = await pdfFile.arrayBuffer();
      }

      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
      setPdfDoc(pdf);
      setTotalPages(pdf.numPages);
      setCurrentPage(0);
      setRenderedPages({});

      await processAllPages(pdf);
    } catch (error) {
      console.error("Error loading PDF:", error);
      setUploadStatus("Error loading PDF. Please try again.");
    }
  };

  const processAllPages = async (pdf) => {
    setLoading(true);
    setUploadStatus("Processing PDF pages...");

    try {
      let allPageImages = [];
      let renderedImages = {};

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        setUploadStatus(`Processing page ${pageNum} of ${pdf.numPages}...`);

        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        canvas.toBlob(async (blob) => {
          const file = new File([blob], `page_${pageNum}.png`, {
            type: "image/png",
          });
          allPageImages.push({ pageNum, file });
          renderedImages[pageNum - 1] = URL.createObjectURL(blob);

          if (pageNum === 1) setPageImage(URL.createObjectURL(blob));

          if (allPageImages.length === pdf.numPages) {
            await uploadImagesToBackend(allPageImages);
          }
        }, "image/png");
      }

      setRenderedPages(renderedImages);
    } catch (error) {
      console.error("Error processing PDF:", error);
      setUploadStatus("Error processing PDF.");
    } finally {
      setLoading(false);
    }
  };

  const uploadImagesToBackend = async (pageImages) => {
    setUploadStatus("Uploading images to server...");
    const formData = new FormData();
    formData.append("folderID", folderID || "default_folder");
    formData.append("user", user.user_id);

    const uniquePageImages = Array.from(new Map(pageImages.map(obj => [obj.pageNum, obj])).values());

    uniquePageImages.forEach(({ pageNum, file }) => {
        formData.append("images", file, `${folderID}_page_${pageNum}.png`);
    });

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/createuserslides/${folderID}/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`Server Error: ${response.status}`);

      const data = await response.json();
      setUploadStatus("Upload complete!");

      if (onPdfProcessed) onPdfProcessed(data);
    } catch (error) {
      console.error("Error uploading images:", error);
      setUploadStatus("Error uploading images.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {/* {uploadStatus && (
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
        <p style={{ fontSize: "18px", fontWeight: "bold", marginTop: "20px" }}>Loading...</p>
      ) : (
        pageImage && ( */}
      <div
        style={{
          flex: 3,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={pageImage}
          alt={`Page ${currentPage + 1}`}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            maxWidth: "100%",
            margin: "0 auto",
          }}
        />
      </div>
      {/* )
      )} */}
    </div>
  );
};

export default PdfViewer;
