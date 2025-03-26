import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// Component Imports
import Webcam from "react-webcam";
import PdfViewer from "./PdfViewer.jsx";
import Navbar2 from "./NavBar2.jsx";
import SignLanguage from "./SignLanguage.jsx";

// Asset and Icon Imports
import Text from "../assets/text.png";
import {
  FaHandPaper,
  FaExpandAlt,
  FaClosedCaptioning,
  FaCamera,
  FaTimesCircle,
  FaSignLanguage,
  FaFileUpload,
  FaPowerOff,
} from "react-icons/fa";

// CSS Import
import "../css/Presentation/Presentation.css";

// Mantine Imports
// Additional React Router Hooks
import { useParams } from "react-router-dom";

const LeadGrid = () => {
  const { folderName } = useParams();
  const webcamRef = useRef(null);
  const [gestureWS, setGestureWs] = useState(null);
  const [processedFrame, setProcessedFrame] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pdfFile, setPdfFile] = useState(null);
  const [Gesture, setGesture] = useState(true);
  const lastActionRef = useRef(null);

  useEffect(() => {
    const gestureSocket = new WebSocket("ws://127.0.0.1:8000/ws/video");
    setGestureWs(gestureSocket);

    gestureSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "image") {
        setProcessedFrame(`data:image/jpeg;base64,${data.image}`);
      }

      if (pdfFile && data.action && data.action !== lastActionRef.current) {
        console.log(data.action);
        if (data.action === "Next") {
          setCurrentPage((prev) => prev + 1);
        } else if (data.action === "Previous") {
          setCurrentPage((prev) => Math.max(0, prev - 1));
        }
        lastActionRef.current = data.action;
      }
    };

    gestureSocket.onerror = (error) => console.error("WebSocket Error:", error);
    gestureSocket.onclose = () => console.log("WebSocket Closed");

    return () => {
      gestureSocket.close();
    };
  }, [pdfFile]);

  const captureFrame = () => {
    if (webcamRef.current) {
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
    const interval = setInterval(captureFrame, 100);
    return () => clearInterval(interval);
  }, [gestureWS]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    setPdfFile(file);
    setCurrentPage(0);
  };

  const processImage = async (imageSrc) => {
    if (imageSrc) {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/upload_frame/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: imageSrc.split(",")[1] }),
          }
        );
        const result = await response.json();
        if (result.text) {
          setImageTextCaption(result.text);
          setShowImageTextCaption(true);
        }
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
  };

  const [mode, setMode] = useState("off");
  const [imageTextCaption, setImageTextCaption] = useState("");
  const [showImageTextCaption, setShowImageTextCaption] = useState(false);
  const [showSignLanguageCaption, setShowSignLanguageCaption] = useState(false);
  const location = useLocation();
  const fileId = location.state?.fileId;

  useEffect(() => {
    let timer;
    if (showImageTextCaption) {
      timer = setTimeout(() => {
        setShowImageTextCaption(false);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [showImageTextCaption]);

  useEffect(() => {
    let timer;
    if (showSignLanguageCaption) {
      timer = setTimeout(() => {
        setShowSignLanguageCaption(false);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [showSignLanguageCaption]);



  const handleRemoveFile = () => {
    setPdfFile(null);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (fileId) {

      const loadFile = async () => {
        try {
          // Temporary dummy file loading
          const dummyPdfUrl = "/sample.pdf"; // Replace with actual file URL
          const response = await fetch(dummyPdfUrl);
          const blob = await response.blob();
          setPdfFile(blob);
          setFolderName(`Folder_${fileId}`);
        } catch (error) {
          console.error("Error loading file:", error);
        }
      };

      loadFile();
    }
  }, [fileId]);

  return (
    <div className="meet-container">
      {/* <Navbar2 /> */}

      <main className="meet-content">
        <div className="main-video-area">
          <div className="presentation-layout">
            {pdfFile ? (
              <>
                <div className="left-panel-large">
                  <PdfViewer
                    pdfFile={pdfFile}
                    currPage={currentPage}
                    folderName={folderName}
                  />
                </div>
                <div className="right-panel-compact">
                  <div className="video-container-small">
                    <Webcam
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width="100%"
                      height="100%"
                      videoConstraints={{
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
            ) : (
              <div className="video-container-large">
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width="100%"
                  height="100%"
                  videoConstraints={{
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
            )}
          </div>
        </div>

        {showImageTextCaption && (
          <div className="captions-container">
            <div className="caption-content">
            <p>Image To Text captions will appear here...</p>
              <p>{imageTextCaption}</p>
            </div>
          </div>
        )}

        {mode === "signLanguage" && (
          <div
            className={`captions-container ${!showSignLanguageCaption ? "captions-hidden" : ""}`}
          >
            <div className="caption-content">
              <p>Sign language captions will appear here...</p>
            </div>
          </div>
        )}

        <footer className="meet-footer">
          <div className="footer-left">
          
          </div>

          <div className="footer-center">
            <div className="control-buttons-group">


              {pdfFile ? (
                <button
                  className="control-button active"
                  data-action="remove"
                  onClick={handleRemoveFile}
                  title="Remove PDF"
                >
                  <FaTimesCircle size={20} />
                  <span className="button-label">Remove PDF</span>
                </button>
              ) : (
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
              )}

              <button
                className={`control-button ${showImageTextCaption ? "active" : ""}`}
                onClick={() => {
                  if (webcamRef.current) {
                    const imageSrc = webcamRef.current.getScreenshot();
                    processImage(imageSrc);
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
                  if (mode === "off") {
                    setMode("gestures");
                    setGesture(true);
                  } else if (mode === "gestures") {
                    setMode("signLanguage");
                    setGesture(true);
                    setShowSignLanguageCaption(true);
                  } else {
                    setMode("off");
                    setGesture(false);
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
      </main>
    </div>
  );
};
export default LeadGrid;
