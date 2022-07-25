import { ThemeChanger } from "components";
import React from "react";
import { FeaturePlayerComponent } from "../audio";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "services/store/store";

const Navbar = () => {
  const { nowPlaying } = useSelector((state: RootState) => state.audio);
  const router = useRouter();
  return (
    <div className="sticky top-0 z-30 flex justify-center w-full h-16 transition-all duration-100 shadow-sm bg-opacity-90 backdrop-blur bg-neutral text-neutral-content">
      <nav className="w-full navbar">
        <div id="player" className="flex-auto">
          {nowPlaying?.entry && (
            <FeaturePlayerComponent
              onClickHome={() => {
                router.push("/");
              }}
              podcastTitle={nowPlaying.entry.podcastTitle}
              episodeTitle={nowPlaying.entry.title}
              audioUrl={nowPlaying.entry.audioUrl}
              pcmUrl={nowPlaying.entry.pcmUrl}
              imageUrl={nowPlaying.entry.imageUrl}
              position={nowPlaying.position}
            />
          )}
        </div>
        <div>
          <ThemeChanger />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
