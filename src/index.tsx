import { h, render } from "preact";
import { Provider, defaultTheme } from "@adobe/react-spectrum";

import { App } from "./pages/app";

render(
  <Provider theme={defaultTheme}>
    <App />
  </Provider>,
  document.body
);
