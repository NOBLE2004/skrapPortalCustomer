import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DashBoard from "./containers/mainDashBoard/DashBoard";
import { createBrowserHistory } from "history";
import SiteManagers from "./containers/mainSiteManagers/SiteManagers";
import Sites from "./containers/mainSites/Sites"
import SignIn from "./containers/registration/SignIn/SignIn";
import MainJobs from "./containers/jobs/MainJobs";
import MainTiping from "./containers/mainTiping/MainTiping";
const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={() => <SignIn />} exact />
        <Layout>
          <Route path="/" component={() => <DashBoard />} exact />
          <Route path="/dashboard" component={() => <DashBoard />} />
          <Route path="/site-managers" component={() => <SiteManagers />} />
          <Route path="/sites" component={() => <Sites />} /> 
          <Route path="/jobs" component={() => <MainJobs />} /> 
          <Route path="/tiping" component={() => <MainTiping />} /> 
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
