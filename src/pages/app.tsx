import { h } from "preact";
import { Route, Router } from "preact-router";
import { Signin } from "./signin";
import { Root } from "./root";

export const App = () => {
  return (
    <Router>
      <Route path="/users/:id" component={Signin} />
      <Route path="/signin" component={Signin} />
      <Route path="/" component={Root} />
    </Router>
  );
};
