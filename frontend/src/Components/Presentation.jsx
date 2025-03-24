import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import PdfViewer from "../Components/PdfViewer";
import Navbar2 from "../Components/NavBar2.jsx";
import { FaVideo, FaAngleUp } from "react-icons/fa";
import "../css/presentation.css";
import Text from "../assets/text.png";
import { useParams } from "react-router-dom";
import SignLanguage from "../Components/SignLanguage.jsx";


const Home = () => {
  const {folderID} = useParams()
  const webcamRef = useRef(null);
  const [gestureWS, setGestureWs] = useState(null);
  const [processedFrame, setProcessedFrame] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pdfFile, setPdfFile] = useState(null);
  const[Gesture,setGesture] = useState(true)
  const lastActionRef = useRef(null);
  const [text2Image, setText2Image] = useState()

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

  const sendCurrentFrame = async (language) => {
    if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
            // Convert Base64 to Blob
            const byteCharacters = atob(imageSrc.split(",")[1]); // Decode Base64
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "image/png" });

            // Create FormData and append file
            const formData = new FormData();
            formData.append("image", blob, "snapshot.png");
            formData.append("language", language);

            // Send FormData using fetch
            const response = await fetch("http://127.0.0.1:8000/api/upload_frame/", {
                method: "POST",
                body: formData, // No need for Content-Type, fetch sets it automatically
            });

            const result = await response.json();
            setText2Image(result)
            console.log("Frame upload result:", result);
        } else {
            console.error("Failed to capture image from webcam.");
        }
    } else {
        console.error("Webcam reference is not available.");
    }
};
// ✅ Correct usage in JSX



  return (
    <>
      <Navbar2 />
      {/* <div className="container"> */}
      {Gesture ? <main className="content">
        <div className="left-panel">
          {pdfFile ? (
            <PdfViewer pdfFile={pdfFile} currPage={currentPage} folderID={folderID} />
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
            <button onClick={() => sendCurrentFrame("tagalog")}>Send Current Frame</button>
          </div>
          <div className="bottom-right">
            <p>
             {text2Image ? text2Image.Response:"none"}
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
      </main>:<SignLanguage/>}

      <button onClick={()=>{
        setGesture((prev)=>!prev)
      }}>gesture button</button>

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
