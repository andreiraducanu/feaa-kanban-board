import React from "react";
import { useSelector } from 'react-redux';
import { Redirect, Route } from "react-router-dom";


const PrivateRoute = (props) => {
    const { component } = props;

    const isAuthenticated = useSelector(state => state.session.isAuthenticated);

    return (isAuthenticated ?
        (
            <Route {...props} component={component} render={undefined} />
        ) :
        (
            <Redirect to={{ pathname: '/login' }} />
        )
    );
};

export default PrivateRoute;