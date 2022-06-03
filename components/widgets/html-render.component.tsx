import React from 'react';

interface HtmlRenderComponent {
  html: string;
}

const HtmlRenderComponent = ({html}: HtmlRenderComponent) => {
  const _getRenderHtml = (html: string) => ({__html: html})

  return (
    <p dangerouslySetInnerHTML={_getRenderHtml(html)}/>
  );
};

export default HtmlRenderComponent;
