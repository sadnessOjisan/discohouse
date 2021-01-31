import { h } from "preact";
import { Route, Router } from "preact-router";

import { Root } from "./root";
import { Signin } from "./signin";
import { User } from "./user";

export const App = () => {
  return (
    <Router>
      <Route path="/users/:id" component={User} />
      <Route path="/signin" component={Signin} />
      <Route path="/" component={Root} />
    </Router>
  );
};
