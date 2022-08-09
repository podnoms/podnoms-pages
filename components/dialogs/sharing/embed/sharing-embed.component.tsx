import React from "react";
import { BiCopyAlt } from "react-icons/bi";
import { RadioButton, showToast } from "components";
import { Domain, PodcastEntry } from "models";
import { copyTextToClipboard } from "services/utils";

interface ISharingEmbedComponent {
  domain: Domain;
  episode: PodcastEntry;
}
const SharingEmbedComponent: React.FC<ISharingEmbedComponent> = ({
  domain,
  episode,
}) => {
  const [theme, setTheme] = React.useState("dark");
  const [embedCode, setEmbedCode] = React.useState("");
  const embedCodeRef = React.useRef(null);

  const copyEmbedCode = async () => {
    await copyTextToClipboard(getEmbedCode());
    showToast("Success", "Embed code successfully copied");
  };
  const getEmbedCode = (): string => {
    const src = `${domain.canonicalUrl}${episode.slug}?theme=${theme}`;
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
      <div className="py-2 pt-4">
        <div className="flex flex-row justify-evenly">
          <div className="ml-4 text-md">Choose a theme</div>
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
        <div className="relative w-full p-2 resize-none bg-secondary text-neutral-content ">
          <div
            className="absolute top-0 right-0 tooltip"
            data-tip="Copy embed code"
          >
            <button
              className="gap-2 mt-1 mr-1 btn btn-sm btn-square glass"
              onClick={copyEmbedCode}
            >
              <BiCopyAlt />
            </button>
          </div>
          <span className="p-2" ref={embedCodeRef}>
            {embedCode}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SharingEmbedComponent;
