import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from './components/common/PrivateRoute';
import { LoginPage, SignUpPage, HomePage, DashboardPage } from './components/pages';

const App = () => {

    return (
        <React.Fragment>
            <CssBaseline />
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
                    <PrivateRoute path="/dashboard/:projectId">
                        <DashboardPage />
                    </PrivateRoute>
                </Switch>
            </Router>
        </React.Fragment>
    );
};

export default App;