import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import { LoginPage, SignUpPage, HomePage, DashboardPage } from './components/pages';

const App = () => {

    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/signup">
                    <SignUpPage />
                </Route>
                <PrivateRoute exact path="/">
                    <HomePage />
                </PrivateRoute>
                <PrivateRoute path="/dashboard">
                    <DashboardPage />
                </PrivateRoute>
            </Switch>
        </Router>
    );
};

export default App;