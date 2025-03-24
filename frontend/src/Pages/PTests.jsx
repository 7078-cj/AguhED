import React, { useState, useEffect } from "react";
import Navbar from "../Components/NavBar2";
import PTESTS from "../Components/pTest";
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  Loader,
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "calc(100vh - 150px)", 
                }}
              >
                <Loader color="blue" size="xl" type="bars" />
              </div>
            ) : (
              // Main content (Presentation)
              <PTESTS />
            )}
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}

export default Home;