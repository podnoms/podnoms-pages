import React from "react";
import { MdPauseCircleFilled, MdPlayCircleFilled } from "react-icons/md";
import { Podcast } from "../../models";
import { HtmlRenderComponent } from "../index";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setNowPlaying } from "../../services/store/audio.store";
import { PlayState } from "../audio";

interface IEpisodeListComponentProps {
  podcast: Podcast;
}

const EpisodeListComponent = ({ podcast }: IEpisodeListComponentProps) => {
  const { nowPlaying, playState } = useSelector((state) => state.audio);
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <div className="text-3xl font-bold text-primary border-b-accent-content">
        Recent Episodes
      </div>

      <ul className="mt-4 shadow border-t-base-100">
        {podcast.podcastEntries.map((entry) => (
          <li className="px-3 pb-4" key={entry.id}>
            <div className="flex">
              <div
                className="flex-none w-12 h-12 mr-3 cursor-pointer stroke-0 align-center"
                onClick={() => {}}
              >
                {nowPlaying?.entry?.id === entry.id &&
                playState === PlayState.Playing ? (
                  <MdPauseCircleFilled
                    className="w-full h-full delay-100 text-info hover:text-secondary"
                    onClick={() =>
                      dispatch(
                        setNowPlaying({
                          playState: PlayState.Paused,
                          nowPlaying: {
                            entry: entry,
                            position: 0,
                          },
                        })
                      )
                    }
                  />
                ) : (
                  <MdPlayCircleFilled
                    className="w-full h-full delay-100 text-info hover:text-secondary"
                    onClick={() =>
                      dispatch(
                        setNowPlaying({
                          playState: PlayState.Playing,
                          nowPlaying: {
                            entry: entry,
                            position: 0,
                          },
                        })
                      )
                    }
                  />
                )}
              </div>
              <div className="flex-grow mr-10">
                <div className="text-lg font-bold">{entry.title}</div>
                <div className="text-sm font-light">
                  <HtmlRenderComponent html={entry.description} maxLines={2} />
                </div>
              </div>
              <div className="shrink-0">
                <Image
                  className="h-auto max-w-full rounded-lg"
                  src={entry.imageUrl}
                  alt={entry.title}
                  width={64}
                  height={64}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default EpisodeListComponent;
