import { h, render } from "preact";
import {
  Provider,
  defaultTheme,
  ActionButton,
  Checkbox,
  LogicButton,
  Switch,
} from "@adobe/react-spectrum";

import { App } from "./pages/app";

render(
  <Provider theme={defaultTheme}>
    aa
    <ActionButton margin="size-200">I'm a light button</ActionButton>{" "}
    <LogicButton variant="and">And</LogicButton>
    <Checkbox value="soccer">Soccer</Checkbox>
    <Switch>Low power mode</Switch>
    <App />
  </Provider>,
  document.body
);
