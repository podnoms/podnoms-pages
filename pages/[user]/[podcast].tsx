import { GetServerSideProps } from "next";
import React from "react";
import { Podcast } from "../../models";
import Image from "next/image";
interface IPodcastPageProps {
  podcast: Podcast;
}
const PodcastPage = ({ podcast }: IPodcastPageProps) => {
  return (
    <div className="pb-4 shadow-xl card bg-base-10">
      <div className="card-body">
        <h2 className="card-title">{podcast.title}</h2>
        <p>{podcast.description}</p>
      </div>
      <figure>
        <Image src={podcast.imageUrl} alt="cover" width={500} height={600} />
      </figure>
    </div>

    // <>
    //   <h2 className="card-title">{podcast.title}</h2>
    //   <p>{podcast.description}</p>
    //   {podcast.coverImageUrl && (
    //     <Image src={podcast.imageUrl} alt="cover" />
    //   )}
    // </>
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
