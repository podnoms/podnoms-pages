import React from "react";
import { PlayState } from "../audio/feature-player.component";

const PlayStateDebugger = () => {
  const [playState, setPlayState] = React.useState<PlayState>(initialPlayState);
  return (
    <div>
      {playState === PlayState.Playing
        ? "Playing"
        : playState === PlayState.Paused
        ? "Paused"
        : "Stopped"}
    </div>
  );
};

export default PlayStateDebugger;
