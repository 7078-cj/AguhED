import React from "react";
import Navbar from "../Components/LandingPage/Navbar";
import GetStarted from "../Components/LandingPage/GetStarted";
import About from "../Components/LandingPage/About";
import WhatWeProvide from "../Components/LandingPage/WhatWeProvide";
import Price from "../Components/LandingPage/Price";
import Footer from "../Components/LandingPage/Footer";
import {
  MantineProvider,
  mantineHtmlProps,
  ColorSchemeScript,
} from "@mantine/core";


export function Landing() {
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
              <div id="home"><GetStarted /></div>
              <div id="features"><WhatWeProvide /></div>
              <div id="services"><Price /></div>
              <div id="about"><About /></div>
              <Footer />
            </div>

          </MantineProvider>
        </body>
      </html>
    );
}

export default Landing;
