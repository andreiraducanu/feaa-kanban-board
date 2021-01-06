import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { LoginPage, SignUpPage, HomePage, DashboardPage } from './components/pages';

const App = () => {

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