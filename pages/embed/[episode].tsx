import React, { ReactElement } from "react";
import resolveDomainProps from "services/resolvers/domain-props-resolver";
import { GetServerSideProps } from "next";
import { PodcastEntry } from "models";
import { EmbeddedPlayerComonent } from "../../components/audio";
import { ThemeProvider } from "next-themes";
import { NextPageWithLayout } from "types/page-with-layout";

type IEmbeddedPageProps = {} & {
  theme: string;
  episode: PodcastEntry;
};
const EmbeddedPage: NextPageWithLayout<IEmbeddedPageProps> = ({
  theme,
  episode,
}) => {
  return (
    <div className="p-10">
      <div className="border">
        <EmbeddedPlayerComonent
          theme={theme}
          onClickHome={() => {}}
          podcastTitle={episode.podcastTitle}
          episodeTitle={episode.title}
          description={episode.description}
          audioUrl={episode.audioUrl}
          pcmUrl={episode.pcmUrl}
          imageUrl={episode.imageUrl}
        />
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
  query,
}) => {
  const domainProps = await resolveDomainProps(req);

  const episode = domainProps?.podcast?.podcastEntries?.filter(
    (e) => e.slug === params?.episode
  )[0];
  return {
    props: {
      theme: query?.theme || "dark",
      episode: episode,
    },
  };
};
EmbeddedPage.getLayout = (page: ReactElement) => {
  const theme =
    page.props?.theme && page.props.theme === "dark" ? "dark" : "emerald";
  return (
    <ThemeProvider defaultTheme={theme} forcedTheme={theme}>
      {page}
    </ThemeProvider>
  );
};
export default EmbeddedPage;