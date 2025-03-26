import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../Components/NavBar2";
import "@mantine/core/styles.css";
import styles from "../css/Home/Home.module.css";
import loaderStyles from "../css/loader.module.css";

import {
  ColorSchemeScript,
  MantineProvider,
  Card,
  Text,
  Loader,
  Container,
  Title,
  Button,
  Modal,
} from "@mantine/core";
import CreateUserFolder from "../Components/CreateUserFolder";
import UserFolders from "../Components/UserFolders";
import { motion } from "framer-motion"; // Animation

function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulated loading effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <ColorSchemeScript defaultColorScheme="dark" />
        <MantineProvider defaultColorScheme="dark">
          <div className={styles.container}>
            <Navbar2 />

            {/* Header Section */}
            <Container pt={90}>
              <Title
                order={2}
                align="center"
                style={{
                  fontWeight: 700,
                  color: "#A0D8EF",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Your Presentations
              </Title>

              {/* Button to open modal */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Button
                  size="md"
                  color="blue"
                  onClick={() => setIsModalOpen(true)}
                >
                  + Create New Folder
                </Button>
              </div>
            </Container>

            {/* Modal for creating user folders */}
            <Modal
              opened={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Create a New Folder"
              centered
            >
              <CreateUserFolder onClose={() => setIsModalOpen(false)} />
            </Modal>

            {/* Loading Animation */}
            {isLoading ? (
              <div className={loaderStyles.loaderContainer}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className={loaderStyles.loaderBox}
                >
                  <Loader color="rgba(0, 116, 217, 0.8)" size="xl" type="ring" />
                  <Text size="lg" weight={500} mt={15} color="#7FDBFF">
                    Loading Your Files...
                  </Text>
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <UserFolders />
              </motion.div>
            )}
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}

export default Home;
