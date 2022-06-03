import React from "react";
import {MdPlayCircleFilled} from "react-icons/md";
import {Podcast} from "../../models";
import {HtmlRenderComponent} from "../index";
import Image from "next/image";

interface IEpisodeListComponentProps {
  podcast: Podcast;
}

const EpisodeListComponent = ({podcast}: IEpisodeListComponentProps) => {
  return (
    <React.Fragment>
      <div className="text-3xl font-bold text-primary border-b-accent-content">Recent Episodes</div>

      <ul className="border-t-base-100 shadow mt-4">
        {podcast.podcastEntries.map((entry) => (
          <li className="px-3 pb-4" key={entry.id}>
            <div className="flex">
              <div
                className="flex-none w-12 h-12 cursor-pointer stroke-0 align-center mr-3"
                onClick={() => {
                }}
              >
                <MdPlayCircleFilled className="w-full h-full delay-100 text-info hover:text-secondary"/>
              </div>
              <div className="flex-grow mr-5">
                <div className="text-lg font-bold">{entry.title}</div>
                <div className="text-sm font-light">
                  <HtmlRenderComponent html={entry.description}/>
                </div>
              </div>
              <div className="">
                <Image className="max-w-full h-auto rounded-lg" src={entry.imageUrl} alt={entry.title}
                       width={64} height={64}/>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default EpisodeListComponent;
