import { Domain, PodcastEntry } from "models";
import React from "react";
import Head from "next/head";

interface IEpisodeHeadComponent {
  episode: PodcastEntry;
  domain: Domain;
}
const EpisodeHeadComponent: React.FC<IEpisodeHeadComponent> = ({
  episode,
  domain,
}) => {
  return (
    <Head>
      <title>{episode.title}</title>
      <meta property="og:title" content={episode.title} key="title" />
      <meta property="og:audio" content={episode.audioUrl} key="audio" />
      <meta property="og:image" content={episode.imageUrl} key="image" />
      <meta property="og:url" content={domain.canonicalUrl} key="url" />
      <meta property="og:type" content="music.song" key="type" />
      <meta property="fb:app_id" content="1887182031397435" key="app_id" />
      <meta
        property="og:description"
        content={episode.description?.replace(/<\/?[^>]+(>|$)/g, "")}
        key="description"
      />
    </Head>
  );
};

export default EpisodeHeadComponent;
