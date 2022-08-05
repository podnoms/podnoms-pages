import { RadioButton } from "components";
import { PodcastEntry } from "models";
import React from "react";
import { BiCopyAlt } from "react-icons/bi";

interface ISharingEmbedComponent {
  episode: PodcastEntry;
}
const SharingEmbedComponent: React.FC<ISharingEmbedComponent> = ({
  episode,
}) => {
  const [theme, setTheme] = React.useState("dark");
  const [embedCode, setEmbedCode] = React.useState("");

  const getEmbedCode = (): string => {
    const src = `https://domain.pages.pdnm.be:3000/embed/${episode.slug}?theme=${theme}`;
    return `<iframe height="185px" width="100%" frameBorder="no"
          scrolling="no" seamless src=${src} />`;
  };

  React.useEffect(() => {
    setEmbedCode(getEmbedCode());
  }, [theme]);

  const onChangeTheme = (theme: string) => {
    setTheme(theme);
  };
  return (
    <div>
      <div className="px-4 pt-2">
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
      <div className="py-2 pt-2">
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
      <div className="divider">Embed Code</div>
      <div className="px-8 pt-1 pb-4">
        <div className="relative w-full p-2 resize-none bg-accent-content text-neutral-content tooltip">
          <button
            className="absolute top-0 right-0 gap-2 mt-1 mr-1 btn btn-sm btn-square glass "
            data-tip="Copy embed code"
          >
            <BiCopyAlt />
          </button>
          <span className="p-2">{embedCode}</span>
        </div>
      </div>
    </div>
  );
};

export default SharingEmbedComponent;
