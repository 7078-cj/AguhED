import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../Components/NavBar2";
import "@mantine/core/styles.css";
import styles from "../css/Home/Home.module.css";
import loaderStyles from "../css/loader.module.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  Card,
  Text,
  Group,
  SimpleGrid,
  Button,
  Loader
} from "@mantine/core";
import {
  FaFilePdf,
  FaFileWord,
  FaFilePowerpoint,
  FaFileAlt,
  FaEye,
} from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for fetching files
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const dummyFiles = [
    {
      id: 1,
      name: "Presentation_1.pdf",
      type: "pdf",
      size: 2621440,
      date: "2024-01-15",
      icon: <FaFilePdf size={24} color="#FF4136" />,
    },
    {
      id: 2,
      name: "Meeting_Notes.docx",
      type: "doc",
      size: 1258291,
      date: "2024-01-14",
      icon: <FaFileWord size={24} color="#0074D9" />,
    },
    {
      id: 3,
      name: "Project_Plan.pptx",
      type: "ppt",
      size: 3984710,
      date: "2024-01-13",
      icon: <FaFilePowerpoint size={24} color="#FF851B" />,
    },
    {
      id: 4,
      name: "Report_Q4.pdf",
      type: "pdf",
      size: 4299161,
      date: "2024-01-12",
      icon: <FaFilePdf size={24} color="#FF4136" />,
    },
    {
      id: 5,
      name: "Budget_2024.xlsx",
      type: "excel",
      size: 1572864,
      date: "2024-01-11",
      icon: <FaFileAlt size={24} color="#2ECC40" />,
    },
  ];

  const [files, setFiles] = useState(dummyFiles);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files).map((file, index) => ({
      id: files.length + index + 1,
      name: file.name,
      type: file.name.split(".").pop(),
      size: file.size,
      date: new Date().toISOString().split("T")[0],
      icon: <FaFileAlt size={24} color="#7FDBFF" />,
    }));
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    setIsDropdownVisible(false);
  };

  const handleOpenPresentation = (fileId) => {
    navigate("/present", { state: { fileId } });
  };

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <ColorSchemeScript defaultColorScheme="dark" />
        <MantineProvider defaultColorScheme="dark">
          <div className={styles.container}>
            <Navbar2 />
            {isLoading ? (
              <div className={loaderStyles.loaderContainer}>
                <div className={loaderStyles.loaderBox}>
                  <Loader
                    color="rgba(0, 116, 217, 0.8)"
                    size="xl"
                    type="ring"
                    mb={20}
                    className={loaderStyles.loader}
                  />
                  <Text
                    size="lg"
                    weight={500}
                    className={loaderStyles.title}
                    mb={10}
                  >
                    Loading Your Files
                  </Text>
                  <Text
                    size="sm"
                    className={loaderStyles.subtitle}
                  >
                    Preparing your workspace...
                  </Text>
                </div>
              </div>
            ) : (
              <div className={styles.content}>
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
                  {files.map((file) => (
                    <Card
                      key={file.id}
                      shadow="lg"
                      padding="xl"
                      radius="lg"
                      className={styles.card}
                    >
                      <Card.Section p="xl" className={styles.cardHeader}>
                        <Group position="apart" align="center">
                          {file.icon}
                          <Text size="sm" className={styles.dateText}>
                            {file.date}
                          </Text>
                        </Group>
                      </Card.Section>

                      <Text
                        weight={600}
                        size="lg"
                        mt="md"
                        mb="xs"
                        className={styles.fileName}
                      >
                        {file.name}
                      </Text>

                      <Text size="sm" className={styles.fileSize} mb="md">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </Text>

                      <Button
                        variant="outline"
                        fullWidth
                        mt="md"
                        radius="md"
                        leftIcon={<FaEye size={16} />}
                        onClick={() => handleOpenPresentation(file.id)}
                        className={styles.openButton}
                      >
                        Open Presentation
                      </Button>
                    </Card>
                  ))}
                </SimpleGrid>
              </div>
            )}
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}

export default Home;


