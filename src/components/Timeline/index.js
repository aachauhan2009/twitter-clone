import React from "react";
import { getPosts } from "../../resources/api";
import Post from "../Post";

export default function Timeline(props) {
  const posts = getPosts.read();

  return (
    <div className="Timeline">
      {posts.map(post => (
        <Post post={post} />
      ))}
    </div>
  );
}
