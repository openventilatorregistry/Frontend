import React from "react";
import imageHero from "./images/hero.png";

export const App = () => {
  return (
    <div className="container">
      <div className="hero">
        <img src={imageHero} />
      </div>

      <div className="tagline">
        a website built on serverless components via the serverless framework
      </div>
    </div>
  );
};
