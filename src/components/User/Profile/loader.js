import React from "react";
import { Flex, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function ProfileLoader(props) {
  return (
    <Flex direction="column" align="center">
      <Flex align="center" width="100%" mt={4}>
        <SkeletonCircle />
        <Skeleton w="100%" ml={2} height="30px" />
      </Flex>
      <SkeletonText height="60px" mt={3} w="100%" />
      {Array.from({ length: 1 }).map((v, i) => (
        <Flex direction="column" m={5} width="100%" key={i}>
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
