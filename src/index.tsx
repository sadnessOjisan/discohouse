import { setup } from "goober";
import { h, render } from "preact";

import { App } from "./pages/app";

setup(h);

render(<App />, document.body);
