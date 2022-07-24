import type { GetServerSideProps, NextPage } from "next";
import { Domain, Podcast } from "../models/";
import { NotFoundComponent, PodcastComponent } from "components";
import { PodcastEntry } from "models";
import resolveDomainProps from "services/resolvers/domain-props-resolver";
import { setDomain } from "services/store/domain.store";
import { useDispatch } from "react-redux";
import React from "react";
import { dom } from "@typescript-eslint/scope-manager/dist/lib/dom";

interface IHomePageProps {
  domain: Domain | null;
  podcast: Podcast | null;
  featured: PodcastEntry;
}

const Home: NextPage<IHomePageProps> = ({ domain, podcast, featured }) => {
  const dispatch = useDispatch();
  if (domain && podcast) {
    dispatch(setDomain(domain));
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
