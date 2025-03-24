import React, { useEffect, useRef, useState } from "react";

// Component Imports
import Webcam from "react-webcam";
import PdfViewer from "../Components/PdfViewer";
import Navbar2 from "../Components/NavBar2.jsx";
import SignLanguage from "../Components/SignLanguage.jsx";

// Asset and Icon Imports
import Text from "../assets/text.png";
import { FaVideo, FaAngleUp } from "react-icons/fa";

// CSS Import
// import "../css/presentation.css";

// Mantine Imports
import { Container, Grid, SimpleGrid, Skeleton } from "@mantine/core";

// Additional React Router Hooks
import { useParams } from "react-router-dom";

const PRIMARY_COL_HEIGHT = "700px";

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
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container fluid my="sm">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" span="auto">
        {pdfFile ? (
          <PdfViewer
            pdfFile={pdfFile}
            currPage={currentPage}
            folderName={folderName}
          />
        ) : (
          <p>No PDF Loaded</p>
        )}

        <Grid gutter="md">
          {/* Middle Skeleton */}
          <Grid.Col span={12}>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              style={{
                width: "50%",
                maxWidth: "640px",
                margin: "0 auto",
                borderRadius: "10px", 
              }}
              videoConstraints={{
                facingMode: "user",
              }}
            />
           
          </Grid.Col>
          {/* Right Skeleton, moved below the middle */}
          <Grid.Col span={12}>
          <p style={{
                width: "50%",
                maxWidth: "640px",
                margin: "0 auto",
                borderRadius: "10px", 
              }}>
              I went through Mrs Shears’ gate, closing it behind me. I walked
              onto her lawn and knelt beside the dog. I put my hand on the
              muzzle of the dog. It was still warm. The dog was called
              Wellington. It belonged to Mrs Shears who was our friend. She
              lived on the opposite side of the road, two houses to the left.
            </p>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
};

export default LeadGrid;
