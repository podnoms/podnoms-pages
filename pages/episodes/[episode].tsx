import {EpisodeComponent} from "components";
import React from "react";
import resolveDomainProps from "services/resolvers/domain-props-resolver";
import {GetServerSideProps, NextPage} from "next";
import {Podcast, Domain, PodcastEntry} from "models";
import {setNowPlaying} from "services/store/audio.store";
import {PlayState} from "components/audio";
import {useDispatch, useSelector} from "react-redux";
import Head from "next/head";
import {useRouter} from "next/router";
import {RootState} from "services/store/store";

interface IEpisodePageProps {
  domain: Domain;
  podcast: Podcast;
  episode: PodcastEntry;
}

const EpisodePage: NextPage<IEpisodePageProps> = (
  {
    domain,
    podcast,
    episode,
  }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {playState, nowPlaying} = useSelector(
    (state: RootState) => state.audio
  );

  React.useEffect(() => {
    if (
      episode &&
      !nowPlaying &&
      playState !== PlayState.Paused &&
      playState !== PlayState.Playing
    ) {
      dispatch(
        setNowPlaying({
          playState: PlayState.Stopped,
          nowPlaying: {
            podcast: podcast,
            entry: episode,
            position: 0,
          },
        })
      );
    }
  }, [episode, dispatch, playState, nowPlaying]);

  return (
    <>
      <Head>
        <title>{episode.title}</title>
        <meta property="og:title" content={episode.title} key="title"/>
        <meta property="og:audio" content={episode.audioUrl} key="audio"/>
        <meta property="og:image" content={episode.imageUrl} key="image"/>
        <meta property="og:url" content={domain.canonicalUrl} key="url"/>
        <meta property="og:type" content="music.song" key="type"/>
        <meta property="fb:app_id" content="1887182031397435" key="app_id"/>
        <meta
          property="og:description"
          content={episode.description?.replace(/<\/?[^>]+(>|$)/g, "")}
          key="description"
        />
      </Head>
      <EpisodeComponent podcast={podcast} episode={episode}/>{" "}
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (
  {
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
export default EpisodePage;
