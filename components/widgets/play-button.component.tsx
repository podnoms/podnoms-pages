import React from "react";
import { MdPlayCircleFilled, MdPauseCircleFilled } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setPlayState } from "services/store/audio.store";
import { PlayState } from "../audio/embedded-player.component";
import { RootState } from "../../services/store/store";

interface IPlayButtonComponent {
  episodeId: string;
  playState: PlayState;
  extraClasses?: string;
}
const PlayButtonComponent: React.FC<IPlayButtonComponent> = ({
  episodeId,
  playState,
  extraClasses,
}) => {
  const dispatch = useDispatch();
  const { nowPlaying } = useSelector((state: RootState) => state.audio);
  return (
    <div
      className={`flex-none cursor-pointer stroke-0 align-center ${extraClasses}`}
      onClick={() => {
        dispatch(
          setPlayState(
            playState === PlayState.Stopped || playState === PlayState.Paused
              ? PlayState.Playing
              : PlayState.Paused
          )
        );
      }}
    >
      {playState === PlayState.Stopped ||
      (playState === PlayState.Paused && episodeId !== nowPlaying?.entry.id) ? (
        <MdPlayCircleFilled className="w-full h-full delay-100 hover:text-secondary" />
      ) : (
        <MdPauseCircleFilled className="w-full h-full delay-100 hover:text-secondary" />
      )}
    </div>
  );
};
export default PlayButtonComponent;
