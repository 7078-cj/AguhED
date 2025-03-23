import React from "react";
import Navbar from "../Components/NavBar2";
import Presentation from "../Components/Presentation";
import "@mantine/core/styles.css";
import { MantineProvider, mantineHtmlProps } from "@mantine/core";

 function Home() {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta charSet="utf-8" />\{" "}
      </head>
      <body>
        <MantineProvider>
          {
            <div>
              <Presentation />
            </div>
          }
        </MantineProvider>
      </body>
    </html>
  );
}

export default Home;