import React from "react";
import { useQuery } from "react-query";
import { getAllMessages } from "../../resources/api";
import Post from "../Post";
import { Flex } from "@chakra-ui/react";

export default function Timeline() {
  const { data } = useQuery("messages", getAllMessages);

  console.log({ data });
  return (
    <Flex direction="column" spacing={4} align="stretch">
      {JSON.stringify(data)}
    </Flex>
  );
}
