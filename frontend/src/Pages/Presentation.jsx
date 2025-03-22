import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import PdfViewer from "../Components/PdfViewer";
import Navbar2 from "../Components/NavBar2.jsx";
import { FaVideo, FaAngleUp } from "react-icons/fa";
import "../css/presentation.css";
import Text from "../assets/text.png";
import { useParams } from "react-router-dom";


const Home = () => {
  const {folderName} = useParams()
  const webcamRef = useRef(null);
  const [gestureWS, setGestureWs] = useState(null);
  const [processedFrame, setProcessedFrame] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pdfFile, setPdfFile] = useState(null);
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

  return (
    <>
      <Navbar2 />
      {/* <div className="container"> */}
      <main className="content">
        <div className="left-panel">
          {pdfFile ? (
            <PdfViewer pdfFile={pdfFile} currPage={currentPage} folderName={folderName} />
          ) : (
            <p>No PDF Loaded</p>
          )}
        </div>

        <div className="right-panel">
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={380}
                height={260}
                videoConstraints={{
                  width: 640,
                  height: 480,
                  facingMode: "user",
                }}
              />
            </div>
            <div>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
              />
            </div>
            <button onClick={sendCurrentFrame}>Send Current Frame</button>
          </div>
          <div className="bottom-right">
            <p>
              I went through Mrs Shears’ gate, closing it behind me. I walked
              onto her lawn and knelt beside the dog. I put my hand on the
              muzzle of the dog. It was still warm. The dog was called
              Wellington. It belonged to Mrs Shears who was our friend. She
              lived on the opposite side of the road, two houses to the left.
            </p>
            {processedFrame && (
              <img
                src={processedFrame}
                alt="Processed Frame"
                style={{ width: "100%", height: "auto" }}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer >
        <div className="footer-left">
          <div className="camera-toggle">
            <FaVideo className="camera-icon" />
            <button><FaAngleUp className="arrow-icon" /></button>
          </div>
          <div className="text-button">
            <img src={Text}className="text-icon" />
          </div>
        </div>
        <div className="time-display">
          {new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </div>
      </footer>
      {/* </div> */}
    </>
  );
};

export default Home;
