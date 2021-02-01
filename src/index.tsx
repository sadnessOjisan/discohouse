import { defaultTheme, Provider } from "@adobe/react-spectrum";
import { h, render } from "preact";

import { App } from "./pages/app";

render(
  <Provider theme={defaultTheme} minHeight="100vh">
    <App />
  </Provider>,
  document.body
);
