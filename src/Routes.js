import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Login from "./login/Login";
import Transfer from "./transfer/Transfer";
import History from "./history/History";

export default ({ childProps }) =>
  <Switch>
    <Route path="/" render={(props) => <Home {...props} {...childProps} />} />;
    <Route path="/login" render={(props) => <Login {...props} {...childProps} />} />;
    <Route path="/transfer" render={(props) => <Transfer {...props} {...childProps} />} />;
    <Route path="/history" render={(props) => <History {...props} {...childProps} />} />;
  </Switch>;
