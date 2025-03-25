import React, { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';

// Component Imports
import Webcam from "react-webcam";
import PdfViewer from "../Components/PdfViewer";
import Navbar2 from "../Components/NavBar2.jsx";
import SignLanguage from "../Components/SignLanguage.jsx";

// Asset and Icon Imports
import Text from "../assets/text.png";
import {
  FaHandPaper,
  FaExpandAlt,
  FaClosedCaptioning,
  FaLanguage,
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
    setPdfFile(file);
  };

  const sendCurrentFrame = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const response = await fetch(
          "http://127.0.0.1:8000/api/upload_frame/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: imageSrc.split(",")[1] }),
          }
        );
        const result = await response.json();
        console.log("Frame upload result:", result);
      }
    }
  };

  const [showCaptions, setShowCaptions] = useState(true);
  const [mode, setMode] = useState("off");
  const [imageToText, setImageToText] = useState(false);
  const location = useLocation();
  const fileId = location.state?.fileId;
  
  const [signLanguageTarget, setSignLanguageTarget] = useState('en');
  const [imageTextTarget, setImageTextTarget] = useState('en');

  const handleRemoveFile = () => {
    setPdfFile(null);
    setCurrentPage(1);
  };

  useEffect(() => {
  if (fileId) {
    // Simulate loading the file based on fileId
    // Replace this with your actual file loading logic
    const loadFile = async () => {
      try {
        // Temporary dummy file loading
        const dummyPdfUrl = '/sample.pdf'; // Replace with actual file URL
        const response = await fetch(dummyPdfUrl);
        const blob = await response.blob();
        setPdfFile(blob);
        setFolderName(`Folder_${fileId}`);
      } catch (error) {
        console.error('Error loading file:', error);
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
                <div
                  className={`right-panel-compact ${
                    !showCaptions ? "captions-off" : ""
                  }`}
                >
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
        <div
          className={`captions-container ${
            !showCaptions ? "captions-hidden" : ""
          }`}
        >
          <div className="caption-content">
            <p>Captions will appear here...</p>
          </div>
        </div>

        <footer className="meet-footer">
          <div className="footer-left"></div>

          <div className="footer-center">
            <button
              className={`control-button ${showCaptions ? "active" : ""}`}
              onClick={() => setShowCaptions(!showCaptions)}
            >
              <FaClosedCaptioning size={20} />
              <span className="button-label">Captions</span>
            </button>

            {pdfFile ? (
              <button
                className="control-button active"
                data-action="remove"
                onClick={handleRemoveFile}
              >
                <FaTimesCircle size={20} />
                <span className="button-label">Remove PDF</span>
              </button>
            ) : (
              <button className="control-button">
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
  className={`control-button ${imageToText ? "active" : ""}`}
  onClick={() => {
    setImageToText(!imageToText);
    if (!imageToText) {
      const imageSrc = webcamRef.current.getScreenshot();
      // Process the image and show result in caption
      processImage(imageSrc);
    }
  }}
>
  <FaLanguage size={20} color={imageToText ? "#81c995" : "#e8eaed"} />
  <span className="button-label">
    {imageToText ? "Image to Text On" : "Image to Text Off"}
  </span>
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
                } else {
                  setMode("off");
                  setGesture(false);
                }
              }}
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

          <div className="footer-right">
            <div className="time-display">
              {new Date().toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
export default LeadGrid;
