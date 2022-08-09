import type { GetServerSideProps, NextPage } from "next";
import { Domain, Podcast } from "../models/";
import { NotFoundComponent, PodcastComponent } from "components";
import { PodcastEntry } from "models";
import resolveDomainProps from "services/resolvers/domain-props-resolver";
import { setDomain } from "services/store/domain.store";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { dom } from "@typescript-eslint/scope-manager/dist/lib/dom";
import { PlayState } from "../components/audio";
import { setNowPlaying } from "../services/store/audio.store";
import { getNowPlayingPosition, getNowPlayingEpisode } from "../services/utils";
import { RootState } from "../services/store/store";

interface IHomePageProps {
  domain: Domain | null;
  podcast: Podcast | null;
  featured: PodcastEntry;
}

const Home: NextPage<IHomePageProps> = ({ domain, podcast, featured }) => {
  const dispatch = useDispatch();
  const { playState, nowPlaying } = useSelector(
    (state: RootState) => state.audio
  );
  React.useEffect(() => {
    if (domain) {
      dispatch(setDomain(domain));
    }
  }, [domain, dispatch]);
  React.useEffect(() => {
    if (
      featured &&
      !nowPlaying &&
      playState !== PlayState.Paused &&
      playState !== PlayState.Playing
    ) {
      if (podcast) {
        dispatch(
          setNowPlaying({
            playState: PlayState.Stopped,
            nowPlaying: {
              podcast: podcast,
              entry: getNowPlayingEpisode(featured),
              position: getNowPlayingPosition(),
            },
          })
        );
      }
    }
  }, [dispatch, featured, nowPlaying, playState, podcast]);
  if (domain && podcast) {
    return (
      <PodcastComponent domain={domain} podcast={podcast} featured={featured} />
    );
  } else {
    return <NotFoundComponent />;
  }
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const props = await resolveDomainProps(req);
  return {
    props,
  };
};
export default Home;
