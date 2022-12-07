import React from 'react';
import { useQuery } from 'react-query';
import { getPosts } from "../../resources/api";
import Post from "../Post";
import {  Center, Flex } from "@chakra-ui/react";

export default function Timeline() {
  const posts = useQuery("timeline", getPosts);

  return (
      <Flex direction="column" spacing={4} align="stretch">
        {posts.data.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Flex>
  );
}
