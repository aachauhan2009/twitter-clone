import React from 'react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { parsePost } from './utils';
import { MdFavorite, MdRepeat } from "react-icons/md";
import { Box, Flex, Avatar,  Icon, Text, Fade, useColorModeValue } from '@chakra-ui/react';

export default function Post({ post }) {
  const posts = useMemo(() => parsePost(post), [post]);
  const backgroundColor = useColorModeValue("blue.400", "gray.700");
  const headerColor = useColorModeValue("white", "cyan.200");


  return (
    <Fade in>
      <Box shadow="md" m={3}>
        <Flex bg={backgroundColor} p={3} color={headerColor}>
          <Flex align="center" flex="1">
            <Avatar
              size="sm"
              mr={2}
              src={post?.user?.profile_image_url}
              name={post?.user?.name}
            />
            {post?.user?.screen_name ? <Link to={`${post?.user?.screen_name}`}>
              {post?.user?.name}
            </Link> : <Text>{post?.user?.name}</Text>}
          </Flex>
          <Flex>
            <Icon as={MdFavorite} w={6} h={6} />
            <Text ml={2} mr={5}>
              {post.favorite_count}
            </Text>

            <Icon as={MdRepeat} w={6} h={6} />
            <Text ml={2}>{post.retweet_count}</Text>
          </Flex>
        </Flex>
        <Box color="gray.500" p={3}>
          {posts.map((p, i) => (
            <span key={i}>{p.replace ? p.replace("\n\n\n", "\n\n") : p}</span>
          ))}
        </Box>
      </Box>
    </Fade>
  );
}
