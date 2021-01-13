import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Header from '../common/Header';
import Board from '../kanban-board/Board';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%'
    },
    wrapper: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        paddingTop: 64,
        paddingLeft: 256
    },
    contentContainer: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden'
    },
    content: {
        flex: '1 1 auto',
        height: '100%',
        overflow: 'auto'
    },
    drawerPaper: {
        width: 256,
        top: 64,
        height: 'calc(100% - 64px)',
    },
});

const DashboardPage = () => {
    const classes = useStyles();

    const { projectId } = useParams();

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
                    {projectId}
                </Drawer>
                <div className={classes.wrapper}>
                    <div className={classes.contentContainer}>
                        <div className={classes.content}>
                            <Container maxWidth={false}>
                                <Box mt={3}>
                                    <Board />
                                </Box>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DashboardPage;