import React from "react";
import Translate from "../assets/translate.png";
import Gesture from "../assets/gesture.png";
import AI from "../assets/ai.png";

const Provide = () => {
 const provideData = [
     {
       image: Gesture,
       title: "Gesture Control",
       text: "Navigate lessons and interact with digital content effortlessly using intuitive hand gestures, enhancing the learning experience.",
     },
     {
       image: Translate,
       title: "Language Translation",
       text: "Seamlessly translate between languages, including sign language, Filipino, and English, ensuring clear communication for all learners.",
     },
     {
       image: AI,
       title: "AI-Powered Features ",
       text: "Utilize real-time object detection and AI-driven tools to enrich lessons, making learning more interactive and accessible.",
     },
   ];
  return (
    <div className="work-section-wrapper3">
      <div className="work-section-top">
        <h1 className="primary-subheading">An ideal fit for everyone</h1>
<p className="primary-text">Made for everyone with student and teacher accounts, free basic features, and Pro options for advanced tools.</p>
      </div>
      <div className="work-section-bottom">
        {provideData.map((data, index) => (
          <div className="work-section-info" key={index}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt={data.title} />
            </div>
            <h2>{data.title} </h2>
            <p>{data.text} </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Provide;
