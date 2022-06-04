import React from "react";

interface HtmlRenderComponent {
  html: string;
  maxLines: number;
}

const HtmlRenderComponent = ({ html, maxLines }: HtmlRenderComponent) => {
  const _getRenderHtml = (html: string) => ({ __html: html });

  return (
    <span
      className="line-clamp-2"
      dangerouslySetInnerHTML={_getRenderHtml(html)}
    />
  );
};

export default HtmlRenderComponent;
