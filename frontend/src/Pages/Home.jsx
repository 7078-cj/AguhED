import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import PdfViewer from "../Components/PdfViewer";

const Home = () => {
  const webcamRef = useRef(null);
  const [ws, setWs] = useState(null);
  const [processedFrame, setProcessedFrame] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pdfFile, setPdfFile] = useState(null);
  const lastActionRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/video");
    setWs(socket);

    socket.onmessage = (event) => {
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

    socket.onerror = (error) => console.error("WebSocket Error:", error);
    socket.onclose = () => console.log("WebSocket Closed");

    return () => {
      socket.close();
    };
  }, [pdfFile]); 

  const captureFrame = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "image", image: imageSrc.split(",")[1] }));
      }
    }
  };

  useEffect(() => {
    if (!ws) return;
    const interval = setInterval(captureFrame, 100); 
    return () => clearInterval(interval);
  }, [ws]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  const sendCurrentFrame = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const response = await fetch("http://127.0.0.1:8000/api/upload_frame/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: imageSrc.split(",")[1] }),
        });
        const result = await response.json();
        console.log("Frame upload result:", result);
      }
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Live Video Stream</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={640}
            height={480}
            videoConstraints={{
              width: 640,
              height: 480,
              facingMode: "user",
            }}
          />
        </div>
        <div>
          <input type="file" accept="application/pdf" onChange={handleFileUpload} />
        </div>
        <button onClick={sendCurrentFrame} style={{ marginTop: "10px", padding: "10px", fontSize: "16px" }}>
          Send Current Frame
        </button>
      </div>

      {pdfFile ? <PdfViewer pdfFile={pdfFile} currPage={currentPage} /> : <p>No PDF Loaded</p>}
    </>
  );
};

export default Home;