import React from "react";
import Image from "next/image";
import { EpisodeListComponent, HtmlRenderComponent } from "components";
import { PodcastPageProps } from "../../types/page-props";

const PodcastComponent: React.FC<PodcastPageProps> = ({ podcast }) => {
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

export default PodcastComponent;
