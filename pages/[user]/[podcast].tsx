import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import Image from "next/image";
import { Domain, Podcast, PodcastEntry } from "models";
import { EpisodeListComponent, HtmlRenderComponent } from "components";
import { getFeaturedEntry } from "services/api";
import { useDispatch, useSelector } from "react-redux";
import { setNowPlaying } from "services/store/audio.store";
import { PlayState } from "components/audio";
import { getPodcast } from "services/api/podnoms";
import { setDomain } from "services/store/domain.store";
import resolveDomainProps from "services/resolvers/domain-props-resolver";
import { resolveUserPodcastProps } from "../../services/resolvers/user-podcast-props-resolver";
import { PodcastPageProps } from "../../types/page-props";
import { RootState } from "services/store/store";
import { getNowPlaying, getNowPlayingPosition } from "services/utils/getNowPlaying";

const PodcastPage = ({ featured, podcast, domain }: PodcastPageProps) => {
  const dispatch = useDispatch();
  const { nowPlaying, playState } = useSelector(
    (state: RootState) => state.audio
  );

  React.useEffect(() => {
    dispatch(setDomain(domain));
  }, [dispatch, domain]);

  React.useEffect(() => {
    if (featured && playState === PlayState.Stopped) {
      dispatch(
        setNowPlaying({
          playState: PlayState.Stopped,
          nowPlaying: {
            podcast: podcast,
            entry: getNowPlaying(featured),
            position: getNowPlayingPosition(),
          },
        })
      );
    }
  }, [featured, dispatch, playState, podcast]);

  return (
    <React.Fragment>
      <div className="px-4 py-4 shadow-xl card lg:card-side bg-base-100">
        <div className="card-body">
          <h2 className="card-title">{podcast.title}</h2>
          <HtmlRenderComponent maxLines={5} html={podcast.description} />
          <div className="justify-end card-actions">
            <button className="btn btn-outline">
              Listen on Apple Podcasts
            </button>
            <button className="btn btn-primary">Listen & Subscribe</button>
          </div>
        </div>
        <figure className="">
          <Image
            className="p-2 rounded-md shadow-2xl shadow-amber-500"
            src={podcast.imageUrl}
            alt="cover"
            width={400}
            height={400}
          />
        </figure>
      </div>
      <div className="pt-8">
        <EpisodeListComponent podcast={podcast} />
      </div>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { featured, podcast } = await resolveUserPodcastProps(context);
  if (context.params?.user && context.params?.podcast) {
    const { domain } = await resolveDomainProps(
      context.req,
      context.params.user as string,
      context.params.podcast as string
    );
    return {
      props: {
        featured,
        podcast,
        domain,
      },
    };
  }
  return { props: {} };
};
export default PodcastPage;
