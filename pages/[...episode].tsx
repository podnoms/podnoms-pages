import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { resolveEpisodeProps } from "../services/resolvers/episode-props-resolver";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../services/store/store";
import { setDomain } from "../services/store/domain.store";
import { PlayState } from "../components/audio";
import { setNowPlaying } from "../services/store/audio.store";
import { EpisodePageProps } from "../types/page-props";
import { EpisodeComponent, NotFoundComponent } from "../components";
import { getNowPlayingEpisode, getNowPlayingPosition } from "../services/utils";
import { EpisodeHeadComponent } from "components";

const EpisodeDirectPage = ({ domain, podcast, episode }: EpisodePageProps) => {
  const dispatch = useDispatch();
  const { playState, nowPlaying } = useSelector(
    (state: RootState) => state.audio
  );
  React.useEffect(() => {
    dispatch(setDomain(domain));
  }, [domain, dispatch]);

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
            entry: getNowPlayingEpisode(episode),
            position: getNowPlayingPosition(),
          },
        })
      );
    }
  }, [podcast, episode, playState, nowPlaying, dispatch]);
  return episode && domain ? (
    <>
      <EpisodeComponent domain={domain} podcast={podcast} episode={episode} />
    </>
  ) : (
    <NotFoundComponent />
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const props = await resolveEpisodeProps(context);
  return props;
};

export default EpisodeDirectPage;
