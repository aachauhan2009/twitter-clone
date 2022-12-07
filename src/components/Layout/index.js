import React from 'react';
import { Link } from 'react-router-dom';
import { useUser, useSetUser } from '../../context/user';
import { Box, Center, Container, Flex, Switch, useColorMode, Button, IconButton, useColorModeValue } from "@chakra-ui/react";
import { MdHome, MdMessage, MdNotifications, MdPerson } from 'react-icons/md';

export default function Layout(props) {
  const user = useUser();
  const setUser = useSetUser();
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue('blue.400', 'gray.700');
  const colorScheme = "gray"

  return (
    <Box w="100%">
      {user && <Center bg={bg} zIndex={1} position="sticky" top="0" boxShadow='base' w="100%" as="header">
        <Container>
          <Flex alignItems="center" justifyContent="space-evenly" my={3}>
            <IconButton
              as={Link}
              colorScheme={colorScheme}
              to="/"
              variant='ghost'
              icon={<MdHome />}
            />
            <IconButton
              as={Link}
              colorScheme={colorScheme}
              to="/messages"
              variant='ghost'
              icon={<MdMessage />}
            />
            <IconButton
              as={Link}
              colorScheme={colorScheme}
              to="/"
              variant='ghost'
              icon={<MdNotifications />}
            />
            <IconButton
              as={Link}
              colorScheme={colorScheme}
              to={`/${user?.screen_name}`}
              variant='ghost'
              icon={<MdPerson />}
            />
            <Button onClick={() => {
              setUser(null);
            }} size='xs'>
              Logout
            </Button>

            <Switch
              colorScheme={colorScheme}
              defaultChecked={colorMode === 'dark'}
              onChange={() =>
                toggleColorMode(colorMode === "light" ? "dark" : "light")
              }
            />
          </Flex>
        </Container>
      </Center>}

      <Container>{props.children}</Container>
    </Box>
  );
}
