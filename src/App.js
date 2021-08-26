import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DashBoard from "./containers/mainDashBoard/DashBoard";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={() => <Login />} exact />
        <Layout>
          <Route path="/" component={() => <Testing />} exact />
          <Route path="/dashboard" component={() => <DashBoard />} />
        </Layout>
      </Switch>
    </Router>
  );
}

const Login = () => {
  return <h1>Login</h1>;
};

const Testing = () => {
  return <h1>asdfasdf </h1>;
};
export default App;
