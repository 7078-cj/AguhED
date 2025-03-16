import React from "react";
import Navbar from "../Components/Navbar";
import GetStarted from "../Components/GetStarted";
import About from "../Components/About";
import WhatWeProvide from "../Components/WhatWeProvide";
import Price from "../Components/Price";
import Footer from "../Components/Footer";



function Landing() {
  return (
      <div className="LandingPage">
        <Navbar />
        <GetStarted />
        <About />
        <WhatWeProvide />
        <Price />
        <About />
        <Footer />
      </div>
  );
}

export default Landing;
