import React, { useState, useEffect } from "react";
import Navbar from "../Components/NavBar2";
import Presentation from "../Components/Presentation";
import "@mantine/core/styles.css";
import styles from "../css/loader.module.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  Loader,
  Text,
} from "@mantine/core";

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a 2-second loading period
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

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

            {isLoading ? (
              <div className={styles.loaderContainer}>
                <div className={styles.loaderBox}>
                  <Loader
                    color="rgba(0, 116, 217, 0.8)"
                    size="xl"
                    type="ring"
                    mb={20}
                    className={styles.loader}
                  />
                  <Text
                    size="lg"
                    weight={500}
                    className={styles.title}
                    mb={10}
                  >
                    Preparing Your Presentation
                  </Text>
                  <Text
                    size="sm"
                    className={styles.subtitle}
                  >
                    Just a moment while we set everything up...
                  </Text>
                </div>
              </div>
            ) : (
              // Main content (Presentation)
              <>
                <Presentation />
              </>

            )}
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}

export default Home;

