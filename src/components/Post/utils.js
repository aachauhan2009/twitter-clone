import React from 'react';
import { Link } from "react-router-dom";

const getText = (entity) => {
  switch (entity.key) {
    case "hashtags":
      return {
        textStr: `#${entity.text}`,
        url: `/hash/${entity.text}`,
      };
    case "user_mentions":
      return {
        textStr: `@${entity.screen_name}`,
        url: `/${entity.screen_name}`,
      };
    case "urls":
      return {
        textStr: entity.url,
      };
    default:
      return {};
  }
};

export const parsePost = post => {
    const posts = [];
    let lastIndex = 0;
    const postText = post.text;
    const flatEntities = Object.keys(post.entities)
      .map(key => post.entities[key].map(v => ({ ...v, key })))
      .flat()
      .sort((a, b) => a.indices[0] - b.indices[0]);
    const lowerPost = post.text.toLowerCase();
    flatEntities.forEach(entity => {
      const { textStr = '', url = '/' } = getText(entity);
      if (textStr === null) return;
      const startIndex = lowerPost.indexOf(textStr.toLowerCase(), lastIndex);
      const endIndex = startIndex + textStr.length;
      const startText = postText.slice(lastIndex, startIndex);
      const tagElement = (
        <Link to={url}>{postText.slice(startIndex, endIndex)}</Link>
      );
      lastIndex = endIndex;
      posts.push(startText, tagElement);
    });
    posts.push(postText.slice(lastIndex, -1));
    return posts;
  }