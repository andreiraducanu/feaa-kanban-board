import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";


interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean;
    redirectPath: string;
}

const ProtectedRoute = (props: ProtectedRouteProps): JSX.Element => {
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