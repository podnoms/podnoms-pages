import React from "react";
import { MdPauseCircleFilled, MdPlayCircleFilled } from "react-icons/md";
import { Podcast } from "../../models";
import { HtmlRenderComponent } from "../index";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setNowPlaying } from "../../services/store/audio.store";
import { PlayState } from "../audio";
import Link from "next/link";
import { RootState } from "services/store/store";
import { PlayButtonComponent } from "components";

interface IEpisodeListComponentProps {
  podcast: Podcast;
}

const EpisodeListComponent = ({ podcast }: IEpisodeListComponentProps) => {
  const { nowPlaying, playState } = useSelector(
    (state: RootState) => state.audio
  );
  const { domain, canonicalUrl } = useSelector(
    (state: RootState) => state.domain
  );

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
              <PlayButtonComponent
                episodeId={entry.id}
                playState={playState}
                extraClasses="flex-none w-12 mr-3 stroke-0 align-center"
              />
              <div className="flex-grow mr-10">
                <div className="text-lg font-bold">
                  <Link href={`${canonicalUrl ?? ""}${entry.slug}`}>
                    <a>{entry.title}</a>
                  </Link>
                </div>
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
