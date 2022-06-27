import React from "react";
import Image from "next/image";
import { EpisodeListComponent, HtmlRenderComponent } from "components";
import { Podcast, PodcastEntry } from "models";
import { useDispatch, useSelector } from "react-redux";
import { setNowPlaying } from "services/store/audio.store";
import { PlayState } from "components/audio";
import { RootState } from "services/store/store";

interface IPodcastPageProps {
  featured: PodcastEntry;
  podcast: Podcast;
}

const PodcastComponent: React.FC<IPodcastPageProps> = ({
  featured,
  podcast,
}) => {
  const { playState } = useSelector((state: RootState) => state.audio);

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (
      featured &&
      playState !== PlayState.Paused &&
      playState !== PlayState.Playing
    ) {
      dispatch(
        setNowPlaying({
          playState: PlayState.Stopped,
          nowPlaying: {
            entry: featured,
            podcast: podcast,
            position: 0,
          },
        })
      );
    }
  }, [featured, dispatch, playState]);
  return (
    <React.Fragment>
      <div className="px-4 py-4 shadow-xl card lg:card-side bg-base-100">
        <div className="card-body">
          <h2 className="card-title">{podcast.title}</h2>
          <HtmlRenderComponent maxLines={5} html={podcast.description} />
          <div className="justify-end card-actions">
            <button className="btn btn-outline">
              Listen on Apple Podcasts
            </button>
            <button className="btn btn-primary">Listen & Subscribe</button>
          </div>
        </div>
        <figure className="">
          <Image
            className="p-2 rounded-md shadow-2xl shadow-amber-500"
            src={podcast.imageUrl}
            alt="cover"
            width={400}
            height={400}
          />
        </figure>
      </div>
      <div className="pt-8">
        <EpisodeListComponent podcast={podcast} />
      </div>
    </React.Fragment>
  );
};

export default PodcastComponent;
