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
import SiteManagerDetailPage from "./components/siteManager/siteManagerDetailPage/SiteManagerDetailPage";
import Register from "./containers/registration/Register/Register";
import AddPhone from "./containers/registration/addPhone/AddPhone";
import MainReports from "./containers/mainReports/MainReports";
import NewReports from "./containers/reports";
import SitesDetailPage from "./components/sites/sitesDetailPage/SitesDetailPage";
import ForgetPassword from "./containers/registration/forgetPassword";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/login" component={() => <SignIn />} exact /> */}
        <PublicRoute path="/login" component={() => <SignIn />} exact restricted={true}/>
        <PublicRoute path="/signup-info" component={() => <Register />} exact restricted={true}/>
        <PublicRoute path="/signup" component={() => <AddPhone />} exact restricted={true}/>
        <PublicRoute path="/forget-password" component={() => <ForgetPassword />} exact restricted={true}/>
        <Layout>
          <PrivateRoute path="/" component={() => <DashBoard />} exact />
          <PrivateRoute path="/dashboard" component={() => <DashBoard />} />
          <PrivateRoute path="/site-managers" component={() => <SiteManagers />} exact/>
          <PrivateRoute path="/site-managers/:id" component={() => <SiteManagerDetailPage />} exact/>
          <PrivateRoute path="/sites" component={() => <Sites />} exact/> 
          <PrivateRoute path="/sites/:id" component={() => <SitesDetailPage />} exact/> 
          <PrivateRoute path="/jobs" component={() => <MainJobs />} /> 
          <PrivateRoute path="/tiping" component={() => <MainTiping />} /> 
          <PrivateRoute path="/tickets" component={() => <MainTickets />} /> 
          <PrivateRoute path="/reports" component={() => <MainReports />} /> 
          <PrivateRoute path="/job-detail/:id" component={() => <MainJobDetail />} />
          <PrivateRoute path="/site-managers/job-detail/:id" component={() => <MainJobDetail />} />
          <PrivateRoute path="/new-reports" component={() => <NewReports />} />
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
