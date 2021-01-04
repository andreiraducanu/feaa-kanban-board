import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import HomePage from './home-page';
import LoginPage from './login-page';
import SignUpPage from './signup-page';
import DashboardPage from './dashboard-page';

const App = (): JSX.Element => {

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/signup">
                    <SignUpPage />
                </Route>
                <Route path="/dashboard">
                    <DashboardPage />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;