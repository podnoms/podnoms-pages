import { GetServerSideProps } from "next";
import React from "react";
import Image from "next/image";
import { Podcast, PodcastEntry } from "models";
import { EpisodeListComponent, HtmlRenderComponent } from "components";
import { getFeaturedEntry } from "services/api";
import { useDispatch } from "react-redux";
import { setNowPlaying } from "services/store/audio.store";
import { PlayState } from "components/audio";

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

const _getPodcast = async (user: string, podcast: string): Promise<Podcast> => {
  const res = await fetch(`${process.env.API_URL}/podcast/${user}/${podcast}`);
  const result = await res.json();

  return result as Podcast;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params?.user && context.params?.podcast) {
    const podcast: Podcast = await _getPodcast(
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
