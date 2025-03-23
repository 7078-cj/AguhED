import React from "react";
import Navbar from "../Components/NavBar";
import GetStarted from "../Components/GetStarted";

import About from "../Components/About";
import WhatWeProvide from "../Components/WhatWeProvide";
import Price from "../Components/Price";
import Footer from "../Components/Footer";
import "@mantine/core/styles.css";
import {
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

export function Landing() {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta charSet="utf-8" />
\      </head>
      <body>
        <MantineProvider>
          {
            <div>
              <Navbar />
              <GetStarted />
              {/* <Testimonials /> */}
              <WhatWeProvide />
              <Price />
              <About />
              <Footer />
            </div>
          }
        </MantineProvider>
      </body>
    </html>
  );
}

export default Landing;
