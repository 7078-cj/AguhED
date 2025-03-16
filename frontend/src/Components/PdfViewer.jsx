import { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker";

const PdfViewer = ({ currPage = 1, pdfFile }) => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(currPage);
  const [pageImage, setPageImage] = useState(null);
  const [renderedPages, setRenderedPages] = useState({}); 
  const [loading, setLoading] = useState(false);

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
  };

  const renderPage = async (pageNum) => {
    if (!pdfDoc) return;

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
      {loading ? (
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
                // border: "1px solid #ccc",
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
