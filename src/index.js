import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./index.css";
import App from "./container/App";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";

const domain = process.env.REACT_APP_DOMAIN;
const clientId = process.env.REACT_APP_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider
        options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
      >
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          redirectUri={"https://humblefood.vercel.app/home"}
        >
          <App />
        </Auth0Provider>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
