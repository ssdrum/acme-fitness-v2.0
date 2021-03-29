import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import { AppProvider } from "./components/AppContext";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { EasybaseProvider, useEasybase } from "easybase-react";
import ebconfig from "./ebconfig.js";

import "./index.css";

ReactDOM.render(
  <EasybaseProvider ebconfig={ebconfig}>
    <AppProvider>
      <App />
    </AppProvider>
  </EasybaseProvider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
