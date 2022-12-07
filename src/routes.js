import React from "react";
import {
  Route, BrowserRouter as Router, Switch
} from "react-router-dom";

import Login from "./components/Login";
import Layout from "./components/Layout";
import { Spinner, Flex } from "@chakra-ui/react";
const Home = React.lazy(() => import("./components/Home"));
const User = React.lazy(() => import("./components/User"));
const Messages = React.lazy(() => import("./components/Messages"));

export const Routes = () => (
  <Router>
    <React.Suspense
      fallback={
        <Flex w="100%" h="100vh" alignItems="center" justifyContent="center">
          <Spinner
            thickness="4px"
            emptyColor="gray.200"
            color="cyan.500"
            size="xl"
          />
        </Flex>
      }
    >
      <Login>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/messages">
              <Messages />
            </Route>
            <Route exact path="/:userId">
              <User />
            </Route>
          </Switch>
        </Layout>
      </Login>
    </React.Suspense>
  </Router>
);