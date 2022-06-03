import React from "react";
import { MdPlayCircleFilled } from "react-icons/md";
import { Podcast } from "../../models";

interface IEpisodeListComponentProps {
  podcast: Podcast;
}
const EpisodeListComponent = ({ podcast }: IEpisodeListComponentProps) => {
  return (
    <div>
      <span className="text-3xl font-bold text-primary">Recent Episodes</span>

      {podcast.podcastEntries.map((entry) => (
        <ul className="px-3 border-t-2" key={entry.id}>
          <li>
            <div className="flex">
              <div>
                {" "}
                <div
                  className="flex-none w-12 h-12 cursor-pointer stroke-0 align-center"
                  onClick={() => {}}
                >
                  <MdPlayCircleFilled className="w-full h-full delay-100 text-info hover:text-secondary" />
                </div>
              </div>
              <div className="flex-grow">
                <div className="text-lg font-bold">Podcast Title</div>
                <div className="text-sm font-light">
                  Keytar a sit lectus vitae beard ornare integer malesuada
                  curabitur beard tempus amet risus elementum craft beer.
                  Gravida mauris mattis curabitur keytar ipsum in cursus commodo
                  tattoo mattis ultricies duis ultricies beard curabitur porta
                  lectus tempus. Specs pellentesque elementum sed at indie orci
                  auctor urna morbi DIY mattis elementum bibendum in indie
                  tellus. Gravida at donec food truck metus rutrum non maecenas
                  brunch urna tellus a risus beard metus tempus tellus.
                </div>
              </div>
              <div className="">Image</div>
            </div>
          </li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </ul>
      ))}
    </div>
  );
};

export default EpisodeListComponent;
