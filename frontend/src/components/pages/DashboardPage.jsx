import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Header from '../common/Header';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
    },
    drawerPaper: {
        width: 256,
        top: 64,
        height: 'calc(100% - 64px)',
    },
});

const DashboardPage = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <Header />
                <Drawer
                    anchor='left'
                    classes={{ paper: classes.drawerPaper }}
                    open
                    variant="persistent"
                >
                    Test
                </Drawer>
            </div>
        </React.Fragment>
    );
};

export default DashboardPage;