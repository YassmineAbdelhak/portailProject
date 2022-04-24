
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import login from "views/login.js";
/*import {PrivateRouter} from "./PrivateRouter";
import Dashboard from "views/Dashboard";*/

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/rtl" render={props => <RTLLayout {...props} />} />
      <Route path="/login" component={login}/> 
      <Redirect from="/" to="/login" />
      
    </Switch>
    {/*<PrivateRouter name="Home" component={AdminLayout} path="/" />*/}
  </Router>,
  document.getElementById("root")
);
