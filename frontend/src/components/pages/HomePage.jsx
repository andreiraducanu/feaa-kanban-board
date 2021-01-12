import React, { useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { CreateProjectDialog } from '../dialogs';
import Header from '../common/Header';
import { getProjects } from "../../api/projectsApi";
import { EmptyImage } from '../../assets/svg/icons';
import { selectProjectIds } from '../../redux/slices/projectsSlice';
import ProjectTable from '../projects/ProjectTable';

const styles = createStyles({
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
        paddingTop: 64
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
    contentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '16px'
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
                <div className={classes.wrapper}>
                    <div className={classes.contentContainer}>
                        <div className={classes.content}>
                            <Container maxWidth={false}>
                                <Box mt={3}>
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
                                            <ProjectTable projectIds={projectIds} />
                                        )
                                    }
                                </Box>
                            </Container>
                        </div>
                    </div>
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
