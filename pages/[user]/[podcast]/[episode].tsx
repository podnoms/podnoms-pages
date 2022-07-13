import React from "react";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {resolveUserPodcastProps} from "../../../services/resolvers/user-podcast-props-resolver";
import resolveDomainProps from "../../../services/resolvers/domain-props-resolver";
import {EpisodeComponent} from "../../../components";
import {EpisodePageProps} from "../../../types/page-props";
import {PlayState} from "../../../components/audio";
import {setNowPlaying} from "../../../services/store/audio.store";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../services/store/store";
import {setDomain} from "../../../services/store/domain.store";

const UserPodcastEpisodePage = ({domain, podcast, episode}: EpisodePageProps) => {
  const dispatch = useDispatch();
  const {playState, nowPlaying} = useSelector(
    (state: RootState) => state.audio
  );
  React.useEffect(() => {
    dispatch(setDomain(domain))
  }, [domain])
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
  }, [podcast, episode, playState, nowPlaying, dispatch]);
  return <EpisodeComponent podcast={podcast} episode={episode}/>
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const {featured, podcast} = await resolveUserPodcastProps(context);
  if (context.params?.user && context.params?.podcast) {
    const {domain, podcast} = await resolveDomainProps(
      context.req,
      context.params.user as string,
      context.params.podcast as string);

    const episode = podcast?.podcastEntries?.filter(
      (e) => e.slug === context.params?.episode
    )[0];

    return {
      props: {
        featured,
        podcast,
        episode,
        domain,
      },
    };

  }
  return {props: {}}
};
export default UserPodcastEpisodePage;
