/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useMemo } from 'react';

const postCSS = css`
  border: 1px solid lightblue;
  padding: 10px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const getText = entity => {
  switch (entity.key) {
    case 'hashtags':
      return `#${entity.text}`;
    case 'user_mentions':
      return `@${entity.screen_name}`;
    case 'urls':
      return entity.url;
    default:
      return null;
  }
};

export default function Post({ post }) {
  const posts = useMemo(() => {
    const posts = [];
    let lastIndex = 0;
    const postText = post.text;
    const flatEntities = Object.keys(post.entities)
      .map(key => post.entities[key].map(v => ({ ...v, key })))
      .flat()
      .sort((a, b) => a.indices[0] - b.indices[0]);
    const lowerPost = post.text.toLowerCase();
    flatEntities.forEach(entity => {
      const textStr = getText(entity);
      if (textStr === null) return;
      const startIndex = lowerPost.indexOf(textStr.toLowerCase(), lastIndex);
      const endIndex = startIndex + textStr.length;
      const startText = postText.slice(lastIndex, startIndex);
      const tagElement = <a href={textStr}>{postText.slice(startIndex, endIndex)}</a>;
      lastIndex = endIndex;
      posts.push(startText, tagElement);
    });
    posts.push(postText.slice(lastIndex, -1));
    return posts;
  }, [post]);

  return (
    <div css={postCSS} key={post.id}>
      <div css={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}>
        <img
          src={post.user.profile_image_url}
          alt={post.user.name}
          css={css`
            height: 30px;
            width: 30px;
            border-radius: 50%;
            margin-right: 5px;
          `}
        />
        <strong>{post.user.name}</strong>
      </div>
      {posts.map((p, i) => (
        <span key={i}>{p.replace ? p.replace('\n\n\n', '\n\n') : p}</span>
      ))}
      <div>
        <button>{post.retweet_count}</button>
      </div>
    </div>
  );
}
