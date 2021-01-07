import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from 'react-redux';

const PrivateRoute = (props) => {
    const {
        component,
        isAuthenticated,
    } = props;

    console.log(props);

    return (isAuthenticated ?
        (
            <Route {...props} component={component} render={undefined} />
        ) :
        (
            <Redirect to={{ pathname: '/login' }} />
        )
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.session.isAuthenticated
})

export default connect(mapStateToProps, null)(PrivateRoute);