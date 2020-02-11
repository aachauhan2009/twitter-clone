/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { getPosts } from "../../resources/api";
import Post from "../Post";

const timelineCSS = css`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

export default function Timeline(props) {
  const posts = getPosts.read();

  return (
    <div css={timelineCSS}>
      {posts.map(post => (
        <Post post={post} />
      ))}
    </div>
  );
}
