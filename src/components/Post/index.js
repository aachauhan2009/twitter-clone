import React from "react";

export default function Post({ post }) {
  return (
    <div className="post" key={post.id}>
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
