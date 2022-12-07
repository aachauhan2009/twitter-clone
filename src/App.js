import React from 'react';
import './App.css';
import { ReactQueryConfigProvider } from 'react-query'
import { ReactQueryDevtools } from "react-query-devtools";
import UserProvider from './context/user';
import { Routes } from "./routes";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";


const queryConfig = {
  suspense: true,
  refetchOnMount: false,
  refetchOnWindowFocus:false,
};

function App() {
  return (
    <ChakraProvider>
      <UserProvider>
        <ReactQueryConfigProvider config={queryConfig}>
          <ColorModeScript initialColorMode="light" />
          <Routes />
          <ReactQueryDevtools />
        </ReactQueryConfigProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
