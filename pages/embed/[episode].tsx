import React from "react";
import resolveDomainProps from "services/domain-props-resolver";
import { GetServerSideProps, NextPage } from "next";
import { Podcast, Domain, PodcastEntry } from "models";
import { FeaturePlayerComponent } from "../../components/audio";

interface IEmbeddedPageProps {
  domain: Domain;
  podcast: Podcast;
  episode: PodcastEntry;
}

const EmbeddedPage: NextPage<IEmbeddedPageProps> = ({
  domain,
  podcast,
  episode,
}) => {
  return (
    <FeaturePlayerComponent
      onClickHome={() => {}}
      podcastTitle={episode.podcastTitle}
      episodeTitle={episode.title}
      description={episode.description}
      audioUrl={episode.audioUrl}
      pcmUrl={episode.pcmUrl}
      imageUrl={episode.imageUrl}
    />
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const domainProps = await resolveDomainProps(req);

  const episode = domainProps?.podcast?.podcastEntries?.filter(
    (e) => e.slug === params?.episode
  )[0];
  return {
    props: {
      domain: domainProps.domain,
      podcast: domainProps.podcast,
      episode: episode,
    },
  };
};
export default EmbeddedPage;
