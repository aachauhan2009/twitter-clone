/** @jsx jsx */

import { jsx, css } from "@emotion/core";

const postCSS = css`
  border: 1px solid lightblue;
  padding: 10px;
`;

export default function Post({ post }) {
  return (
    <div css={postCSS} key={post.id}>
      <div>
        <strong>{post.user.name}</strong>
      </div>
      {post.text}
      <div>
        <button>{post.retweet_count}</button>
      </div>
    </div>
  );
}
