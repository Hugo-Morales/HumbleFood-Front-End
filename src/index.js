import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./container/App";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

var options = {
  theme: {
    primaryColor: '#31324F'
  }
};

ReactDOM.render(
    <React.StrictMode>
      <Auth0Provider
        domain="heredero.us.auth0.com"
        clientId="LL9DAV9QgGBR4z8ltQcsgE6hShfSrNts"
        redirectUri={window.location.origin}
        advancedOptions={options}
      >
        <Provider store={store}>
            <App />
        </Provider>
      </Auth0Provider>
    </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
