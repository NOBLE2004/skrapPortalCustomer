import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, restricted, ...rest }) => (
    <Route {...rest} render={props => (localStorage.getItem("isAuthenticated") && restricted ? 
    <Redirect to="/" /> : <Component {...props} />)} />
)


export default PublicRoute;