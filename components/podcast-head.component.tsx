import { Domain, Podcast, PodcastEntry } from "models";
import React from "react";
import Head from "next/head";

interface IEpisodeHeadComponent {
  podcast: Podcast;
  domain: Domain;
}
const PodcastHeadComponent: React.FC<IEpisodeHeadComponent> = ({
  podcast,
  domain,
}) => {
  return (
    <Head>
      {podcast && domain && (
        <>
          <title>{podcast.title}</title>
          <meta property="og:title" content={podcast.title} key="title" />
          <meta property="og:image" content={podcast.imageUrl} key="image" />
          <meta property="og:url" content={domain.canonicalUrl} key="url" />
          <meta property="fb:app_id" content="1887182031397435" key="app_id" />
          <meta
            property="og:description"
            content={podcast.description?.replace(/<\/?[^>]+(>|$)/g, "")}
            key="description"
          />
        </>
      )}
    </Head>
  );
};

export default PodcastHeadComponent;
