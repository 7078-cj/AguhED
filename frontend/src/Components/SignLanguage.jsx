import React, { useEffect, useRef, useState } from 'react'
import Webcam from "react-webcam";

function SignLanguage({}) {
    const [gestureWS, setGestureWs] = useState(null);
      const webcamRef = useRef(null);
    
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
                    <div></div>
                    
    </div>
    
  )
}

export default SignLanguage