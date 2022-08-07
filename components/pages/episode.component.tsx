import React from "react";
import Image from "next/image";
import { Domain, Podcast, PodcastEntry } from "models";
import Link from "next/link";
import { ImEmbed2, ImShare2 } from "react-icons/im";
import { HiRss } from "react-icons/hi";
import { useSelector } from "react-redux";
import HtmlRenderComponent from "components/widgets/html-render.component";
import {
  SharingEmbedDialog,
  SharingShareDialog,
  SubscribeDialog,
} from "components/dialogs";
import { RootState } from "services/store/store";
import {
  CommentsComponent,
  EpisodeHeadComponent,
  NotFoundComponent,
} from "../index";
import { PlayButtonComponent } from "components";

interface IEpisodeComponentProps {
  domain: Domain;
  podcast: Podcast;
  episode: PodcastEntry;
}

const EpisodeComponent: React.FC<IEpisodeComponentProps> = ({
  domain,
  podcast,
  episode,
}) => {
  const [showShareDialog, setShowShareDialog] = React.useState(false);
  const [showEmbedDialog, setShowEmbedDialog] = React.useState(false);
  const [showSubscribeDialog, setShowSubscribeDialog] = React.useState(false);
  const { nowPlaying, playState } = useSelector(
    (state: RootState) => state.audio
  );

  return domain.canonicalUrl ? (
    <>
      <EpisodeHeadComponent episode={episode} domain={domain} />

      <div className="flex flex-col">
        <div className="flex">
          <div className="flex-auto">
            <div
              id="episode-header"
              className="mr-12 border-t-2 border-b-2 border-spacing-10"
            >
              <Link href={domain.canonicalUrl}>
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
                      <li
                        className="px-1 py-2 border-t-2 cursor-pointer"
                        onClick={() => setShowEmbedDialog(true)}
                      >
                        <div className="flex justify-around">
                          <div className="flex-grow">Embed</div>
                          <div>
                            <ImEmbed2 className="w-5 h-5" />
                          </div>
                        </div>
                      </li>
                      <li
                        className="px-1 py-2 border-t-2 border-b-2 cursor-pointer"
                        onClick={() => setShowSubscribeDialog(true)}
                      >
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
                    <PlayButtonComponent
                      episodeId={episode.id}
                      playState={playState}
                      extraClasses="flex-none w-16"
                    />
                    <span className="py-2.5 pl-2 text-2xl text-base-content font-bold">
                      {episode.title}
                    </span>
                  </div>
                  <div className="p-4 mx-4 mt-8 shadow-2xl">
                    <HtmlRenderComponent
                      html={episode.description}
                      maxLines={20}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <Image
              className="p-2 rounded-md shadow-2xl shadow-accent"
              src={podcast.imageUrl}
              width={400}
              height={400}
              alt={episode.title}
            />
          </div>

          <SharingShareDialog
            show={showShareDialog}
            episode={episode}
            handleClose={() => setShowShareDialog(false)}
          />
          <SharingEmbedDialog
            show={showEmbedDialog}
            episode={episode}
            handleClose={() => setShowEmbedDialog(false)}
          />
          <SubscribeDialog
            show={showSubscribeDialog}
            podcast={podcast}
            episode={episode}
            handleClose={() => setShowSubscribeDialog(false)}
          />
        </div>
        <div className="m-8">
          <CommentsComponent />
        </div>
      </div>
    </>
  ) : (
    //TODO:
    //https://www.frontendmentor.io/solutions/interactive-comments-section-with-tailwind-and-react-62RI-wVsh
    <NotFoundComponent />
  );
};

export default EpisodeComponent;
