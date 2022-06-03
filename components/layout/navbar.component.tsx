import React from "react";
import { ThemeChanger } from "../../components";
import FeaturePlayerComponent from "../audio/feature-player.component";

const Navbar = () => {
  return (
    // <div
    //   className="sticky top-0 z-30 flex justify-center w-full h-16 transition-all duration-100 bg-opacity-90 backdrop-blur text-primary-content"
    // >
    <div className="sticky top-0 z-30 flex justify-center w-full h-16 transition-all duration-100 shadow-sm bg-opacity-90 backdrop-blur bg-base-100 text-base-content">
      <nav className="w-full navbar">
        <div id="player" className="flex-auto">
          <FeaturePlayerComponent />
        </div>
        <div>
          <ThemeChanger />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
