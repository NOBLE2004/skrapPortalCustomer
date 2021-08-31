import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DashBoard from "./containers/mainDashBoard/DashBoard";
import { createBrowserHistory } from "history";
import SiteManagers from "./containers/mainSiteManagers/SiteManagers";
import Sites from "./containers/mainSites/Sites"
import SignIn from "./containers/registration/SignIn/SignIn";
const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={() => <SignIn />} exact />
        <Layout>
          <Route path="/" component={() => <Testing />} exact />
          <Route path="/dashboard" component={() => <DashBoard />} />
          <Route path="/site-managers" component={() => <SiteManagers />} />
          <Route path="/sites" component={() => <Sites />} /> 
        </Layout>
      </Switch>
    </Router>
  );
}


const Testing = () => {
  return <h1>asdfasdf </h1>;
};
export default App;
