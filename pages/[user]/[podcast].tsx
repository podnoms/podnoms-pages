import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Podcast } from "../../models";
import Image from "next/image";
import { ThemeChanger } from "../../components";
interface IPodcastPageProps {
  podcast: Podcast;
}
const PodcastPage = ({ podcast }: IPodcastPageProps) => {
  return (
    <>
      <ThemeChanger />
      <div>{podcast.title}</div>
      <div>{podcast.description}</div>
      {podcast.coverImageUrl && (
        <Image src={podcast.coverImageUrl} alt="cover" />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("[podcast]", "getServerSideProps", context.params);
  const res = await fetch(
    `${process.env.API_URL}/podcast/${context.params?.user}/${context.params?.podcast}/featured`
  );
  const podcast: Podcast = await res.json();

  return {
    props: {
      podcast,
    },
  };
};
export default PodcastPage;
