import React from "react";
import { Flex, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function TimelineLoader(props) {
  return (
    <Flex direction="column" align="center">
      {Array.from({ length: 10 }).map((v, i) => (
        <Flex direction="column" m={5} width="100%" key={i} >
          <Flex align="center">
            <SkeletonCircle />
            <Skeleton w="100%" ml={2} height="30px" />
          </Flex>
          <SkeletonText height="40px" mt={3} ml={10} />
        </Flex>
      ))}
    </Flex>
  );
}