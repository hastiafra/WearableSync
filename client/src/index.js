import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";
import { ItemProvider } from "./components/ItemContext";
import LoginProvider from "../LoginProvider"

ReactDOM.render(
  <LoginProvider>
    <ItemProvider>
      <App />
    </ItemProvider>
    </LoginProvider>,
  document.getElementById('root')
);
