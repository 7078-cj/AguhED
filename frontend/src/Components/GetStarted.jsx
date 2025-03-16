import React from "react";
import Navbar from "../Components/Navbar";
import { MantineProvider } from "@mantine/core";
import grid from "../assets/grid.png";

function Landing() {
  return (
    <MantineProvider>
      <div className="home-container">
        <div className="home-banner-container">
          <div className="home-banner"></div>
          <div className="home-text-section">
            <h1 className="primary-heading">
              Visualize Your Lessons & Interactions in a
            </h1>
            <h1 className="primary-heading2">Seamless Learning Experience</h1>
            <p className="primary-text">
              Enhancing learning with gesture control, sign language
              translation, and AI features for a more interactive and inclusive
              experience.
            </p>
            <div className="secondary-button">
              <button className="home-button">Get Started</button>
            </div>
          </div>
          <div className="home-image-container">
            <img src={grid} alt="" />
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}

export default Landing;
