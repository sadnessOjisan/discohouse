import { defaultTheme,Provider } from "@adobe/react-spectrum";
import { h, render } from "preact";

import { App } from "./pages/app";

render(
  <Provider theme={defaultTheme}>
    <App />
  </Provider>,
  document.body
);
