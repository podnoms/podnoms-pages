import { ThemeChanger } from "components";
import React from "react";
import { FeaturePlayerComponent } from "../audio";

const Navbar = () => {
  return (
    // <div
    //   className="sticky top-0 z-30 flex justify-center w-full h-16 transition-all duration-100 bg-opacity-90 backdrop-blur text-primary-content"
    // >
    <div className="sticky top-0 z-30 flex justify-center w-full h-16 transition-all duration-100 shadow-sm bg-opacity-90 backdrop-blur bg-base-100 text-base-content">
      <nav className="w-full navbar">
        <div id="player" className="flex-auto">
          <FeaturePlayerComponent
            title="Fergal's Mixyboos"
            description="Fergal@Home - Lower your expectations mix"
            audioUrl="https://api.podnoms.com/audio/2ef3cd54-df28-40d4-bc61-08d804c488ea.mp3"
            pcmUrl="https://cdn.podnoms.com/waveforms/ed87efe9-f1fe-46c9-3a1b-08d7a9fff3c2.json"
            imageUrl="https://i.pdnm.be/images/entry/44c3c133-900e-49c2-666b-08d72c897f8b.jpg?width=725&height=748&cb=7bf2bb13-b492-4605-b1e7-a39ec99b96c2"
          />
        </div>
        <div>
          <ThemeChanger />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
