import { GetServerSideProps } from "next";
import React from "react";
import Image from "next/image";
import { Podcast, PodcastEntry } from "models";
import { EpisodeListComponent, HtmlRenderComponent } from "components";
import { getFeaturedEntry } from "services/api";
import { useDispatch } from "react-redux";
import { setNowPlaying } from "services/store/audio.store";
import { PlayState } from "components/audio";
import { getPodcast } from "services/api/podnoms";

interface IPodcastPageProps {
  featured: PodcastEntry;
  podcast: Podcast;
}

const PodcastPage = ({ featured, podcast }: IPodcastPageProps) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (featured) {
      dispatch(
        setNowPlaying({
          playState: PlayState.Stopped,
          nowPlaying: {
            podcast: podcast,
            entry: featured,
            position: 0,
          },
        })
      );
    }
  }, [featured, dispatch]);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  //first, check if we're on a custom CNAME
  let user = context.params?.user;
  let podcast = context.params?.podcast;

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
  }

  if (user && podcast) {
    const podcast: Podcast = await getPodcast(
      context.params?.user as string,
      context.params?.podcast as string
    );
    const featured: PodcastEntry = await getFeaturedEntry(
      context.params?.user as string,
      context.params?.podcast as string
    );

    return {
      props: {
        featured,
        podcast,
      },
    };
  }
  return { props: {} };
};
export default PodcastPage;
