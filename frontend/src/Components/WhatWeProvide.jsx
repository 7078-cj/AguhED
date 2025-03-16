import React from "react";

const Provide = () => {
  return (
    <div className="container">
      <h2>What We Provide</h2>
      <div className="price-row">
        <div className="price-col">
          <p>BASIC</p>
          <h3>Free</h3>
          <ul>
            <li>Upload up to 30 PDFs</li>
            <li>Present for up to 30 minutes</li>
            <li>Access to Word Translation only</li>
          </ul>
        </div>
        <div className="price-col">
          <p>PRO</p>
          <h3>$0.00 <span>/ month</span></h3>
          <ul>
            <li>Upload up to 100 PDFs</li>
            <li>Unlimited presentation time</li>
            <li>Access to Word and Sign Language Translation</li>
            <li>Access to Object Analysis</li>
          </ul>
        </div>
        <div className="price-col">
          <p>ACADEMIA</p>
          <h3>Free</h3>
          <ul>
            <li>Upload up to 100 PDFs</li>
            <li>Unlimited presentation time</li>
            <li>Access to Word and Sign Language Translation</li>
            <li>Access to Object Analysis</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Provide;
