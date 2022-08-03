import { RadioButton } from "components";
import { PodcastEntry } from "models";
import React from "react";
import { EmbeddedPlayerComonent } from "../../../audio";
interface ISharingEmbedComponent {
  episode: PodcastEntry;
}
const SharingEmbedComponent: React.FC<ISharingEmbedComponent> = ({
  episode,
}) => {
  const [theme, setTheme] = React.useState("dark");

  const onChangeTheme = (theme: string) => {
    setTheme(theme);
  };
  return (
    <div>
      <div className="px-4 pt-8">
        <iframe
          key={theme}
          height="185px"
          width="100%"
          frameBorder="no"
          scrolling="no"
          seamless
          src={`https://domain.pages.pdnm.be:3000/embed/${episode.slug}?theme=${theme}`}
        />
      </div>
      <div className="py-3 shadow-md">
        <div className="flex flex-row justify-evenly">
          <RadioButton
            label="dark"
            value={theme === "dark"}
            onChange={() => onChangeTheme("dark")}
          />
          <RadioButton
            label="light"
            value={theme === "light"}
            onChange={() => onChangeTheme("light")}
          />
        </div>
      </div>
    </div>
  );
};

export default SharingEmbedComponent;
