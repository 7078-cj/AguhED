import React, { useState } from "react";
import Navbar from "../Components/NavBar2";
import Dropdown from "../Components/Dropdown";
import "@mantine/core/styles.css";
import { MantineProvider, mantineHtmlProps, Card, Text } from "@mantine/core";

function Home() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(true); 
  const [files, setFiles] = useState([]); 

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files); 
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]); 
    setIsDropdownVisible(false); 
  };

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <ColorSchemeScript defaultColorScheme="dark" />
        <MantineProvider defaultColorScheme="dark">
          <div>
            <Navbar />
            {/* Show Dropdown if visible */}
            {isDropdownVisible && (
              <Dropdown>
                <input
                  type="file"
                  onChange={handleFileUpload} 
                  multiple 
                  style={{ display: "block", margin: "10px 0" }}
                />
              </Dropdown>
            )}
            {/* Render a card for each uploaded file */}
            <div style={{ padding: "20px" }}>
              {files.map((file, index) => (
                <Card
                  key={index}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  style={{ marginBottom: "10px" }}
                >
                  <Text weight={500}>{file.name}</Text>
                  <Text size="sm" color="dimmed">
                    {Math.round(file.size / 1024)} KB
                  </Text>
                </Card>
              ))}
            </div>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}

export default Home;
