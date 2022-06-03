import {GetServerSideProps} from "next";
import React from "react";
import {Podcast, PodcastEntry} from "../../models";
import Image from "next/image";
import {EpisodeListComponent} from "../../components";
import HtmlRenderComponent from "../../components/widgets/html-render.component";

interface IPodcastPageProps {
  featured: Podcast;
  podcast: Podcast;
}

const PodcastPage = ({featured, podcast}: IPodcastPageProps) => {
  return (
    <React.Fragment>
      <div className="px-4 py-4 shadow-xl card lg:card-side bg-base-100">
        <div className="card-body">
          <h2 className="card-title">{podcast.title}</h2>
          <HtmlRenderComponent html={podcast.description}/>
          <div className="justify-end card-actions">
            <button className="btn btn-outline">
              Listen on Apple Podcasts
            </button>
            <button className="btn btn-primary">Listen & Subscribe</button>
          </div>
        </div>
        <figure>
          <Image src={podcast.imageUrl} alt="cover" width={400} height={400}/>
        </figure>
      </div>
      <div className="pt-4">
        <EpisodeListComponent podcast={podcast}/>
      </div>
    </React.Fragment>
  );
};
const _getFeaturedEpisode = async (user: string, podcast: string) => {
  const res = await fetch(
    `${process.env.API_URL}/podcast/${user}/${podcast}/featured`
  );
  return await res.json();
};

const _getPodcast = async (user: string, podcast: string): Promise<Podcast> => {
  const res = await fetch(`${process.env.API_URL}/podcast/${user}/${podcast}`);
  const result = await res.json();

  return result as Podcast;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("[podcast]", "getServerSideProps", context.params);

  if (context.params?.user && context.params?.podcast) {
    const podcast: Podcast = await _getPodcast(
      context.params?.user as string,
      context.params?.podcast as string
    );
    const featured: PodcastEntry = await _getFeaturedEpisode(
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
  return {props: {}};
};
export default PodcastPage;
