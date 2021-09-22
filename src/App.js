import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DashBoard from "./containers/mainDashBoard/DashBoard";
import { createBrowserHistory } from "history";
import SiteManagers from "./containers/mainSiteManagers/SiteManagers";
import Sites from "./containers/mainSites/Sites"
import SignIn from "./containers/registration/SignIn/SignIn";
import MainJobs from "./containers/mainJobs/MainJobs";
import MainTiping from "./containers/mainTiping/MainTiping";
import MainTickets from "./containers/mainTickets/MainTickets";
import MainJobDetail from "./containers/mainJobDetail/MainJobDetail";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/login" component={() => <SignIn />} exact /> */}
        <PublicRoute path="/login" component={() => <SignIn />} exact restricted={true}/>
        <Layout>
          <PrivateRoute path="/" component={() => <DashBoard />} exact />
          <PrivateRoute path="/dashboard" component={() => <DashBoard />} />
          <PrivateRoute path="/site-managers" component={() => <SiteManagers />} />
          <PrivateRoute path="/sites" component={() => <Sites />} /> 
          <PrivateRoute path="/jobs" component={() => <MainJobs />} /> 
          <PrivateRoute path="/tiping" component={() => <MainTiping />} /> 
          <PrivateRoute path="/tickets" component={() => <MainTickets />} /> 
          <PrivateRoute path="/job-detail/:id" component={() => <MainJobDetail />} />
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
