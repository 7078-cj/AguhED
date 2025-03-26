import React, { useEffect, useRef, useState } from 'react'
import Webcam from "react-webcam";

function SignLanguage({}) {
      const [gestureWS, setGestureWs] = useState(null);
      const webcamRef = useRef(null);
      const [letterCounts, setLetterCounts] = useState({});
      const [formedWord, setFormedWord] = useState("");
      const [showSignLanguageCaption, setShowSignLanguageCaption] = useState(false);
      const [lastAddedLetter, setLastAddedLetter] = useState(null);
      const [predictedWord, setPredictedWord] = useState()

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
      
          if (data.type === "image") {
            setProcessedFrame(`data:image/jpeg;base64,${data.image}`);
          }
      
          if (data.action) {
            console.log(data.action);
            setPredictedWord(data.action)
            if (data.action !== "none") {
              setLetterCounts((prevCounts) => {
                const newCount = (prevCounts[data.action] || 0) + 1;
                const updatedCounts = { ...prevCounts, [data.action]: newCount };
      
                if (newCount === 20) {
                  if (lastAddedLetter !== data.action) {
                    setFormedWord((prev) => prev + data.action);
                    setLastAddedLetter(data.action); // Store last added letter
                  }
                  return {};
                }
      
                return updatedCounts;
              });
      
              // Reset last added letter after a short delay (prevents duplicates)
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
        }, [gestureWS])


  return (
    <div className="app-container">
    {/* Right Panel - Webcam */}
    <div className="right-panel-compact pt-10">
      <div className="video-container-small">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={380}
          height={260}
          videoConstraints={{
            width: 320,
            height: 240,
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
        width: "100vw",
        height: "100vh",
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
        }}
      >
        <div className='flex flex-col gap-10'>
          <p style={{ color: "white", fontSize: "24px" }}>{predictedWord}</p>
        <p style={{ color: "white", fontSize: "24px" }}>{formedWord}</p>
        </div>
        
      </div>
    </div>
  </div>
          
    
    
  )
}

export default SignLanguage