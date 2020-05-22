import React from "react";
import logo from "./logo.svg";

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Redirect,
} from "react-router-dom";
import PokeDash from "./components/PokeDash";
function App() {
  return (
    <Router>
      <Route />
      <Route path="/" component={PokeDash} />
    </Router>
  );
}

export default App;
