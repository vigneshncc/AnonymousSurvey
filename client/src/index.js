import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import Dash from "./dash/Dash";
import * as serviceWorker from "./serviceWorker";
import Survey from "./Survey/Survey";
const routing = (
  <Router>
    <div>
      {/* <Route path="/" component={App} /> */}
      <Route path="/survey" component={Survey} />
      <Route path="/admin" component={App} />
      <Route path="/dashboard" component={Dash} />
      {/* <Route path="/result" component={App} /> */}
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
