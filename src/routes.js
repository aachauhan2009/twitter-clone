import React from "react";
import {
  Route, BrowserRouter as Router, Switch
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";


export const AllRoutes = props => (
  <Router>
    <Login>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Login>
  </Router>
);