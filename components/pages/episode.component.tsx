import React from "react";
import Image from "next/image";
import { Podcast, PodcastEntry } from "models";
import Link from "next/link";
import { MdPauseCircleFilled, MdPlayCircleFilled } from "react-icons/md";
import { ImEmbed2, ImShare2 } from "react-icons/im";
import { HiRss } from "react-icons/hi";
import { setNowPlaying } from "../../services/store/audio.store";
import { PlayState } from "../audio";
import { useDispatch, useSelector } from "react-redux";
import HtmlRenderComponent from "components/widgets/html-render.component";
import { SharingDialog } from "components/dialogs";
import { RootState } from "services/store/store";
interface IEpisodeComponentProps {
  podcast: Podcast;
  episode: PodcastEntry;
}
const EpisodeComponent: React.FC<IEpisodeComponentProps> = ({
  podcast,
  episode,
}) => {
  const [showShareDialog, setShowShareDialog] = React.useState(false);
  const { nowPlaying, playState } = useSelector(
    (state: RootState) => state.audio
  );
  const dispatch = useDispatch();
  return (
    <div className="flex">
      <div className="flex-auto">
        <div
          id="episode-header"
          className="mr-12 border-t-2 border-b-2 border-spacing-10"
        >
          <Link href="/">
            <a>
              <div className="px-6 py-2 uppercase">Back To Episodes</div>
            </a>
          </Link>
        </div>
        <div id="episode-details" className="flex flex-row pt-12">
          <div id="episode-details-left" className="px-3 mr-8">
            <div className="flex flex-col">
              <div>
                <Image
                  className="p-2 rounded-md shadow-2xl shadow-orange-900"
                  src={episode.imageUrl}
                  width={128}
                  height={128}
                  alt={episode.title}
                />
              </div>
              <div className="mt-8">
                <ul className="text-sm uppercase font-extralight">
                  <li
                    className="px-1 py-2 border-t-2 cursor-pointer"
                    onClick={() => setShowShareDialog(true)}
                  >
                    <div className="flex justify-around">
                      <div className="flex-grow">Share</div>
                      <div>
                        <ImShare2 className="w-5 h-5" />
                      </div>
                    </div>
                  </li>
                  <li className="px-1 py-2 border-t-2 cursor-pointer">
                    <div className="flex justify-around">
                      <div className="flex-grow">Embed</div>
                      <div>
                        <ImEmbed2 className="w-5 h-5" />
                      </div>
                    </div>
                  </li>
                  <li className="px-1 py-2 border-t-2 border-b-2 cursor-pointer">
                    <div className="flex justify-around">
                      <div className="flex-grow">Subscribe</div>
                      <div>
                        <HiRss className="w-5 h-5" />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div id="episode-details-right">
            <div id="episode-details-right-header h-16">
              <div className="flex flex-row ">
                <div id="playbutton" className="w-16">
                  {nowPlaying?.entry?.id === episode.id &&
                  playState === PlayState.Playing ? (
                    <MdPauseCircleFilled
                      className="w-full h-full delay-100 text-info hover:text-secondary"
                      onClick={() =>
                        dispatch(
                          setNowPlaying({
                            playState: PlayState.Paused,
                            nowPlaying: {
                              entry: episode,
                              podcast: podcast,
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
                              entry: episode,
                              podcast: podcast,
                              position: 0,
                            },
                          })
                        )
                      }
                    />
                  )}
                </div>
                <span className="py-2.5 pl-2 text-4xl font-bold">
                  {episode.title}
                </span>
              </div>
              <div className="p-4 mx-4 mt-8 shadow-2xl">
                <HtmlRenderComponent html={episode.description} maxLines={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Image
          className="p-2 rounded-md shadow-2xl shadow-orange-900"
          src={podcast.imageUrl}
          width={400}
          height={400}
          alt={episode.title}
        />
      </div>
      <SharingDialog
        show={showShareDialog}
        episode={episode}
        handleClose={() => setShowShareDialog(false)}
      />
    </div>
    //TODO:
    //https://www.frontendmentor.io/solutions/interactive-comments-section-with-tailwind-and-react-62RI-wVsh
  );
};

export default EpisodeComponent;
