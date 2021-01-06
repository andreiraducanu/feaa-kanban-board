import React from "react";
import { Redirect, Route } from "react-router-dom";


const ProtectedRoute = (props) => {
    const {
        component,
        isAuthenticated,
        redirectPath
    } = props;

    return (isAuthenticated ?
        (
            <Route {...props} component={component} render={undefined} />
        ) :
        (
            <Redirect to={{ pathname: redirectPath }} />
        )
    );
};

export default ProtectedRoute;