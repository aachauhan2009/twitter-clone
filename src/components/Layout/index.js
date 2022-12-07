import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/user';
import { Box, Center, Container, Icon,  Flex, Switch, useColorMode, Button, IconButton, useColorModeValue } from "@chakra-ui/react";
import { MdHome, MdMessage, MdNotifications, MdPerson } from 'react-icons/md';

export default function Login(props) {
  const user = useUser();
  const { colorMode, toggleColorMode } = useColorMode();

  const backgroundColor = useColorModeValue('gray.200', 'gray.700')
  return (
    <Box>
      <Center bg={backgroundColor} as="header">
        <Container>
          <Flex alignItems="center" justifyContent="space-evenly" my={3}>
            <IconButton
              as={Link}
              colorScheme="cyan"
              to="/"
              variant="outline"
              icon={<MdHome />}
            />
            <IconButton
              as={Link}
              colorScheme="cyan"
              to="/messages"
              variant="outline"
              icon={<MdMessage />}
            />
            <IconButton
              as={Link}
              colorScheme="cyan"
              to="/"
              variant="outline"
              icon={<MdNotifications />}
            />
            <IconButton
              as={Link}
              colorScheme="cyan"
              to={`/${user?.screen_name}`}
              variant="outline"
              icon={<MdPerson />}
            />
            <Switch
              colorScheme="cyan"
              defaultChecked={colorMode === 'dark'}
              onChange={() =>
                toggleColorMode(colorMode === "light" ? "dark" : "light")
              }
            />
          </Flex>
        </Container>
      </Center>

      <Container>{props.children}</Container>
    </Box>
  );
}
