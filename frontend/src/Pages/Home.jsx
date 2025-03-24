import React, { useContext, useState } from "react";
import Navbar from "../Components/NavBar2";
import Dropdown from "../Components/Dropdown";
import "@mantine/core/styles.css";
import { MantineProvider, mantineHtmlProps, Card, Text } from "@mantine/core";
import CreateUserFolder from "../Components/CreateUserFolder";
import AuthContext from "../Context/AuthContext";
import UserFolders from "../Components/UserFolders";
import UserSlides from "../Components/UserSlides";

function Home() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(true); 
  const [files, setFiles] = useState([]); 
  const [hasSlides, setHasSlides] = useState(false); // ✅ Track if slides exist
  let { user } = useContext(AuthContext);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files); 
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]); 
    setIsDropdownVisible(false); 
  };

  // ✅ Function to receive slides status from UserSlides
  const handleSlidesCheck = (status) => {
    setHasSlides(status);
  };

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body style={{ position: "relative", height: "100vh" }}>
        <MantineProvider>
          <div>
            <Navbar />
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

            <CreateUserFolder userId={user.user_id} />
            <UserFolders userId={user.user_id} />

            {/* ✅ Pass function to UserSlides */}
            <UserSlides folderID={30} onSlidesCheck={handleSlidesCheck} />

            {/* ✅ Display message based on hasSlides */}
            <p className="text-lg font-bold text-center mt-4">
              {hasSlides ? "✅ Slides Exist!" : "❌ No Slides Found"}
            </p>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}

export default Home;
