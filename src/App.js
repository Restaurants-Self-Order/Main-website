import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line

import RestaurantLandingPage from "pages/RestaurantLandingPage.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Partner from "pages/Partner";

export default function App() {
  // return <AnimationRevealPage disabled></AnimationRevealPage>;
  return (
    <Router>
      <Switch>
      <Route path="/partner">
          <Partner />
        </Route>
        <Route path="/">
          <RestaurantLandingPage />
        </Route>
       
      </Switch>
    </Router>
  );
}