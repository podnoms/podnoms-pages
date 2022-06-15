import { EpisodeComponent } from "components";
import React from "react";
import resolveDomainProps from "services/domain-props-resolver";
import { GetServerSideProps, NextPage } from "next";
import { Podcast, PodcastEntry } from "models";
import { setNowPlaying } from "services/store/audio.store";
import { PlayState } from "components/audio";
import { useDispatch, useSelector } from "react-redux";

interface IEpisodePageProps {
  podcast: Podcast;
  episode: PodcastEntry;
}
const EpisodePage: NextPage<IEpisodePageProps> = ({ podcast, episode }) => {
  const { playState, nowPlaying } = useSelector((state) => state.audio);

  const dispatch = useDispatch();
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
            entry: episode,
            position: 0,
          },
        })
      );
    }
  }, [episode, dispatch, playState, nowPlaying]);

  return <EpisodeComponent podcast={podcast} episode={episode} />;
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { domain, podcast, featured } = await resolveDomainProps(req);
  let episode: PodcastEntry | null = null;
  if (podcast) {
    episode = podcast.podcastEntries.filter(
      (e) => e.slug == params?.episode
    )[0];
  }
  return {
    props: {
      podcast,
      episode,
    },
  };
};
export default EpisodePage;
