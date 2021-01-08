import React, { useState } from 'react';
import clsx from 'clsx';
import { createStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../common/Header';

const styles = createStyles({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    content: {
        flexGrow: 1,
        backgroundColor: 'red'
    },
});

const DashboardPage = (props) => {
    const { classes } = props;

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <Header />
                <div className={classes.content}>
                    Hello World
                </div>
            </div>
        </React.Fragment>
    );
};

export default withStyles(styles)(DashboardPage);