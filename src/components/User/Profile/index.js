import React from 'react';
import { useParams } from 'react-router-dom';
import { getUseDetails } from "../../../resources/api";
import Post from '../../Post';
import { useQuery } from "react-query";
import { Avatar, Box, Text, Heading, Flex, Link, Icon } from '@chakra-ui/react';
import dayjs from 'dayjs';
import {  MdLocationOn, MdDateRange } from 'react-icons/md';

function abbreviateNumber(value) {
  var newValue = value;
  if (value >= 1000) {
    var suffixes = ["", "K", "M", "B", "T"];
    var suffixNum = Math.floor(("" + value).length / 3);
    var shortValue = "";
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum !== 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
}

export default function UseProfile() {
  const { userId } = useParams();
  const { data: user } = useQuery(["user", userId], () => getUseDetails(userId));

  if (!user.screen_name) {
    return (
      <Flex m={3} justifyContent="center">
        <Text>Oops! This user doesn't exists</Text>
      </Flex>
    );
  }
  return (
    <Box>
      <Box m={3}>
        <Flex align="center">
          <Avatar mr={2} src={user.profile_image_url_https} name={user.name} />
          <Box>
            <Heading size="md">{user.name}</Heading>
            <Text fontSize="sm">@{user.screen_name}</Text>
          </Box>
        </Flex>

        <Text mt={2} fontSize="sm">
          {user.description}
        </Text>

        <Box>
          <Link isExternal href={user.url}>
            {user?.entities?.url?.urls?.[0]?.expanded_url}
          </Link>
        </Box>

        <Flex align="center">
          <Text mr={2}>
            <Icon as={MdLocationOn} /> {user.location}
          </Text>
          <Text ml={2}>
            <Icon as={MdDateRange} /> Joined{" "}
            {dayjs(user.created_at).format("MMM, YYYY")}
          </Text>
        </Flex>

        <Flex align="center">
          <Text mr={2}>
            {abbreviateNumber(user.followers_count)} Followers{" "}
          </Text>
          <Text ml={2}>{abbreviateNumber(user.friends_count)} Following</Text>
        </Flex>
      </Box>
      <Post
        post={{
          ...user.status,
          user: { profile_image_url: user.profile_image_url, name: user.name },
        }}
      />
    </Box>
  );
}
