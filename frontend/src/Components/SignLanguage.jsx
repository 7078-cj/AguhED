import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import "../css/Presentation/SignLanguage.css";


function SignLanguage() {
  const [gestureWS, setGestureWs] = useState(null);
  const webcamRef = useRef(null);
  const [letterCounts, setLetterCounts] = useState({});
  const [formedWord, setFormedWord] = useState("");
  const [lastAddedLetter, setLastAddedLetter] = useState(null);
  const [predictedWord, setPredictedWord] = useState("");

  useEffect(() => {
    if (formedWord.length > 0) {
      setLetterCounts({});
    }
  }, [formedWord]);

  useEffect(() => {
    const gestureSocket = new WebSocket("ws://127.0.0.1:8000/ws/sign_language");
    setGestureWs(gestureSocket);

    gestureSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.action) {
        console.log(data.action);
        setPredictedWord(data.action);
        
        if (data.action !== "none") {
          setLetterCounts((prevCounts) => {
            const newCount = (prevCounts[data.action] || 0) + 1;
            const updatedCounts = { ...prevCounts, [data.action]: newCount };

            if (newCount === 20) {
              if (lastAddedLetter !== data.action) {
                setFormedWord((prev) => prev + data.action);
                setLastAddedLetter(data.action);
              }
              return {};
            } else if (data.action === "none") {
              setLetterCounts({});
              return {};
            }

            return updatedCounts;
          });

          setTimeout(() => setLastAddedLetter(null), 1000);
        }
      }
    };

    gestureSocket.onerror = (error) => console.error("WebSocket Error:", error);
    gestureSocket.onclose = () => console.log("WebSocket Closed");

    return () => {
      gestureSocket.close();
    };
  }, []);

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

  // Clear function to reset words
  const clearFormedWord = () => {
    setFormedWord("");
    setLetterCounts({});
    setPredictedWord("");
  };

  return (
    <div className="app-container">
      {/* Right Panel - Webcam */}
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

      {/* Fullscreen Slide Content */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#000",
          zIndex: 1, // Keeps the slides below the webcam
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div className="flex flex-col gap-10 text-center">
            <p style={{ color: "white", fontSize: "24px" }}>
              Predicted Letter: {predictedWord}
            </p>
            <p style={{ color: "white", fontSize: "24px" }}>
              Formed Word: {formedWord}
            </p>

            {/* Clear Button */}
            <button
              onClick={clearFormedWord}
              style={{
                padding: "10px 20px",
                fontSize: "18px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#ff4d4d",
                color: "white",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignLanguage;
