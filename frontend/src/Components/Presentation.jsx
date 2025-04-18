import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// Component Imports
import Webcam from "react-webcam";
import PdfViewer from "./PdfViewer.jsx";
// import Navbar2 from "./NavBar2.jsx";
import SignLanguage from "./SignLanguage.jsx";

// Asset and Icon Imports
import Text from "../assets/text.png";
import {
  FaHandPaper,
  FaCamera,
  FaSignLanguage,
  FaFileUpload,
  FaPowerOff,
} from "react-icons/fa";

// CSS Import
import "../css/Presentation/Presentation.css";
import "../css/Presentation/Footer.css";


// Mantine Imports
// Additional React Router Hooks
import { useParams } from "react-router-dom";
import UserSlides from "./UserSlides.jsx";

const Presentation = () => {
  const { folderID } = useParams();
  const webcamRef = useRef(null);
  const [gestureWS, setGestureWs] = useState(null);
  const [processedFrame, setProcessedFrame] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pdfFile, setPdfFile] = useState(null);
  const [Gesture, setGesture] = useState(true);
  const lastActionRef = useRef(null);
  const [hasSlides, setHasSlides] = useState(true);
  const [mode, setMode] = useState("gestures");
  const [imageTextCaption, setImageTextCaption] = useState("");
  const [showImageTextCaption, setShowImageTextCaption] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  

  const location = useLocation();

  const handleSlidesCheck = (status) => {
    setHasSlides(status);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (mode !== "gestures") return;

    const gestureSocket = new WebSocket("ws://127.0.0.1:8000/ws/video");
    setGestureWs(gestureSocket);

    gestureSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.modelReady === "true") {
        setModelReady(true);
        console.log("ready");
      }

      if (pdfFile || hasSlides) {
        if (data.action && data.action !== lastActionRef.current) {
          console.log("Gesture detected:", data.action);
          
          if (data.action === "Next") {
            setCurrentPage((prev) => prev + 1);
          } else if (data.action === "Previous") {
            setCurrentPage((prev) => Math.max(0, prev - 1));
          }
          
          lastActionRef.current = data.action;
        }
      }
    };
    

    gestureSocket.onerror = (error) => console.error("WebSocket Error:", error);
    gestureSocket.onclose = () => console.log("WebSocket Closed");

    return () => {
      gestureSocket.close();
    };
  }, [mode]);

  const captureFrame = () => {
    if (webcamRef.current && modelReady == true) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (gestureWS && gestureWS.readyState === WebSocket.OPEN) {
        gestureWS.send(
          JSON.stringify({ type: "image", image: imageSrc.split(",")[1] })
        );
      }
    }
  };

  useEffect(() => {
    if (!gestureWS) return;
    if (modelReady) {
      const interval = setInterval(captureFrame, 100);
      return () => clearInterval(interval);
    }
  }, [gestureWS]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    setPdfFile(file);
    setCurrentPage(0);
  };

  const processImage = async (language) => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        console.error("Failed to capture image from webcam.");
        return;
      }

      const byteCharacters = atob(imageSrc.split(",")[1]);
      const byteNumbers = Array.from(byteCharacters, (char) =>
        char.charCodeAt(0)
      );
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });

      const formData = new FormData();
      formData.append("image", blob, "snapshot.png");
      formData.append("language", language);

      try {
        setImageTextCaption("Loading...");
        const response = await fetch(
          "http://127.0.0.1:8000/api/upload_frame/",
          { method: "POST", body: formData }
        );
        const result = await response.json();
        setImageTextCaption(result.Response || "No text detected");
        setShowImageTextCaption(true);
        setTimeout(() => setShowImageTextCaption(false), 5000);
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
  };

  useEffect(() => {
    if (!gestureWS || !modelReady || gestureWS.readyState !== WebSocket.OPEN)
      return;

    const interval = setInterval(captureFrame, 100);
    return () => clearInterval(interval);
  }, [gestureWS, modelReady]);


  return (
    <div className="meet-container">
      {/* <Navbar2 /> */}

      <main className="meet-content">
        {mode == "gestures" ? (
          <div className="main-video-area">
            <div className="presentation-layout">
              <>
                {hasSlides ? (
                  <UserSlides
                    onSlidesCheck={handleSlidesCheck}
                    currPage={currentPage}
                    folderID={folderID}
                    onPageChange={handlePageChange}
                  />
                ) : pdfFile ? (
                  <div className="left-panel-large">
                    <PdfViewer
                      pdfFile={pdfFile}
                      currPage={currentPage}
                      folderID={folderID}
                    />
                  </div>
                ) : (
                  <></>
                )}

                <div className="right-panel-compact">
                  <div className="video-container-small">
                    <Webcam
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width={380}
                      height={260}
                      videoConstraints={{
                        width: 380,
                        height: 260,
                        facingMode: "user",
                      }}
                    />

                    <div className="video-overlay">
                      <div className="participant-info">
                        <span className="participant-name">You</span>
                        <span className="connection-status">HD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        ) : (
          <div>
            <SignLanguage />
          </div>
        )}

        </main>

        {showImageTextCaption && (
          <div className="captions-container">
            <div className="caption-content">
              <p>Image To Text captions will appear here...</p>
              <p>{imageTextCaption}</p>
            </div>
          </div>
        )}

        <footer className="meet-footer">
          <div className="footer-left"></div>

          <div className="footer-center">
            <div className="control-buttons-group">
              {/* add check if theres a pdf in db */}

              {!hasSlides ? (
                <button className="control-button" title="Upload PDF">
                  <label className="file-upload-label">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileUpload}
                      className="file-input"
                    />
                    <FaFileUpload size={20} />
                    <span className="button-label">Upload PDF</span>
                  </label>
                </button>
              ) : (
                <></>
              )}

              <button
                className={`control-button ${
                  showImageTextCaption ? "active" : ""
                }`}
                onClick={() => {
                  if (webcamRef.current) {
                    processImage("tagalog");
                    setShowImageTextCaption(true);
                    setTimeout(() => {
                      setShowImageTextCaption(false);
                    }, 10000);
                  }
                }}
                title="Capture Text from Screen"
              >
                <FaCamera size={20} color="#e8eaed" />
                <span className="button-label">Image to Text</span>
              </button>

              <button
                className={`control-button ${mode !== "off" ? "active" : ""}`}
                data-mode={mode}
                onClick={() => {
                  if (gestureWS) {
                    gestureWS.close();
                    setGestureWs(null);
                  }

                  if (mode === "gestures") {
                    setMode("signLanguage");
                    setGesture(false);
                  } else if (mode === "signLanguage") {
                    setMode("gestures");
                    setGesture(true);
                  }
                }}
                title="Detection Mode"
              >
                {mode === "gestures" ? (
                  <>
                    <FaHandPaper
                      size={20}
                      color={mode === "gestures" ? "#8ab4f8" : "#e8eaed"}
                    />
                    <span className="button-label">Gestures</span>
                  </>
                ) : mode === "signLanguage" ? (
                  <>
                    <FaSignLanguage
                      size={20}
                      color={mode === "signLanguage" ? "#81c995" : "#e8eaed"}
                    />
                    <span className="button-label">Sign Language</span>
                  </>
                ) : (
                  <>
                    <FaPowerOff size={20} />
                    <span className="button-label">Detection Off</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="footer-right">
            <div className="meeting-info">
              <div className="meeting-time">
                {new Date().toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </div>
            </div>
          </div>
        </footer>
    </div>
  );
};
export default Presentation;
