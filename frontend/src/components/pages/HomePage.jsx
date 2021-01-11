import React, { useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { CreateProjectDialog } from '../dialogs';
import Header from '../common/Header';
import { getProjects } from "../../api/projectsApi";
import { EmptyImage } from '../../assets/svg/icons';

import { selectProjectIds } from '../../redux/slices/projectsSlice';
import ProjectList from '../projects/ProjectList';

const styles = createStyles({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    content: {
        flexGrow: 1,
        padding: '0 40px',
    },
    contentHeader: {
        display: 'flex',
        margin: '16px 0 24px'
    },
    title: {
        flexGrow: 1
    },
    emptyContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '48px 0',
    },
    emptyImage: {
        maxWidth: '160px',
        minHeight: '160px',
        height: 'auto',
        width: 'auto',
    },
});

const HomePage = (props) => {
    const { classes } = props;

    const projectIds = useSelector(selectProjectIds);
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [showCreateProject, setShowCreateProject] = useState(false);

    const isProjectsEmpty = () => projectIds.length == 0;

    useLayoutEffect(() => {
        dispatch(getProjects(currentUser.username));
    }, []);

    const CreateProjectButton = () => (
        <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => setShowCreateProject(true)}
        >
            Create Project
        </Button >
    );

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <Header />
                <div className={classes.content}>
                    <div className={classes.contentHeader}>
                        <Typography className={classes.title} variant="h5">
                            Projects
                    </Typography>
                        {!isProjectsEmpty() && <CreateProjectButton />}
                    </div>
                    {isProjectsEmpty() ?
                        (
                            <div className={classes.emptyContainer}>
                                <EmptyImage className={classes.emptyImage} />
                                <Typography
                                    variant="h6"
                                    style={{ marginBottom: '16px' }}
                                >
                                    You currently have no projects
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    style={{ marginBottom: '24px' }}
                                >
                                    Let's create your first project
                                </Typography>
                                <CreateProjectButton />
                            </div>
                        ) : (
                            <ProjectList projectIds={projectIds} />
                        )
                    }
                </div>
            </div>
            <CreateProjectDialog
                open={showCreateProject}
                onClose={() => setShowCreateProject(false)}
            />
        </React.Fragment>
    );
};


export default withStyles(styles)(HomePage);
