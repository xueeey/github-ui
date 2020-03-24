import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

let initialRepo = window.location.pathname.slice(1);

if (!initialRepo) {
  initialRepo = "facebook/react";
  window.history.replaceState({}, initialRepo, `/${initialRepo}`);
}

ReactDOM.render(
  <App initialRepo={initialRepo} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
