import { setup } from "goober";
import { h, render } from "preact";

import { initFirebase } from "./infra/firebase";
import { App } from "./pages/app";

setup(h);

initFirebase();

render(<App />, document.body);
