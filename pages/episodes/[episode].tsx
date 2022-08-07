import { EpisodeComponent, EpisodeHeadComponent } from "components";
import React from "react";
import resolveDomainProps from "services/resolvers/domain-props-resolver";
import { GetServerSideProps, NextPage } from "next";
import { Podcast, Domain, PodcastEntry } from "models";
import { setNowPlaying } from "services/store/audio.store";
import { PlayState } from "components/audio";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "services/store/store";
import { getNowPlayingPosition } from "../../services/utils";

interface IEpisodePageProps {
  domain: Domain;
  podcast: Podcast;
  episode: PodcastEntry;
}

const EpisodePage: NextPage<IEpisodePageProps> = ({
  domain,
  podcast,
  episode,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { playState, nowPlaying } = useSelector(
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
            position: getNowPlayingPosition(),
          },
        })
      );
    }
  }, [podcast, episode, dispatch, playState, nowPlaying]);

  return (
    <EpisodeComponent domain={domain} podcast={podcast} episode={episode} />
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
export default EpisodePage;
