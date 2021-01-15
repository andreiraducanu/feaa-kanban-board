import React, { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Header from '../common/Header';
import Board from '../kanban-board/Board';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getProject } from '../../api/projectsApi';
import ProjectMembers from '../projects/ProjectMembersList';
import { AddMemberDialog, CreateIssueDialog } from '../dialogs'


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
    loadingContainer: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 64,
    },
    drawerPaper: {
        width: 256,
        top: 64,
        height: 'calc(100% - 64px)',
        padding: '16px'
    }
});


const DashboardPage = () => {

    const classes = useStyles();
    const { projectId } = useParams();

    const project = useSelector(state => state.projects.current);
    const status = useSelector(state => state.projects.status);

    const dispatch = useDispatch();

    const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
    const [showCreateIssueDialog, setShowCreateIssueDialog] = useState(false);

    useLayoutEffect(() => {
        dispatch(getProject(projectId));
    }, []);

    return (
        <div className={classes.root}>
            <Header />
            {(project == null || status == 'loading') ?
                (
                    <div className={classes.loadingContainer}>
                        <CircularProgress />
                    </div>
                ) :
                (
                    <React.Fragment>

                        <Drawer
                            anchor='left'
                            classes={{ paper: classes.drawerPaper }}
                            open
                            variant="persistent"
                        >
                            <Grid
                                container
                                spacing={1}
                                direction='column'
                            >

                                <Grid item>
                                    <Typography variant="h5">
                                        {project.name}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    justify='space-between'
                                    alignItems='center'>
                                    <Grid item>
                                        <Typography variant="subtitle2">
                                            Members
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setShowAddMemberDialog(true)}
                                        >
                                            Add
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <ProjectMembers members={project.members} />
                                </Grid>
                                <Grid item>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setShowCreateIssueDialog(true)}
                                    >
                                        Create a new issue
                                    </Button>
                                </Grid>
                            </Grid>
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
                        <AddMemberDialog
                            open={showAddMemberDialog}
                            onClose={() => setShowAddMemberDialog(false)}
                            projectId={projectId}
                        />
                        <CreateIssueDialog
                            open={showCreateIssueDialog}
                            onClose={() => setShowCreateIssueDialog(false)}
                            members={project.members}
                            projectId={projectId}
                        />
                    </React.Fragment>
                )
            }
        </div >

    );
};

export default DashboardPage;