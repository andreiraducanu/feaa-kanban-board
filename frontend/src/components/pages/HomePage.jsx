import React, { useState, useEffect } from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { EmptyImage } from '../../assets/svg/icons';
import { CreateProjectDialog } from '../dialogs';
import Header from '../common/Header';
import { getProjects } from "../../api/projectApi";
import { connect } from "react-redux";
import TableRow from '@material-ui/core/TableRow';
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
    }
});

const HomePage = (props) => {
    const { classes } = props;

    const [showCreateProject, setShowCreateProject] = useState(false);
    const { projects, getProjects } = props;
    const { user } = props;
    const isProjectsEmpty = () => projects.length == 0;

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

    function displayAllDetailsAboutProject(project) {
        console.log(project.id);
    }

    useEffect(() => {
        getProjects(user);
    }, []);

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
                    {
                        isProjectsEmpty() ?
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
                            ) :
                            (
                                <div>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Created Date</TableCell>
                                                <TableCell>Lead</TableCell>
                                            </TableHead>
                                            <TableBody>

                                                {projects.map((project) => (

                                                    <TableRow key={project.id} onClick={() => displayAllDetailsAboutProject(project)}>
                                                        <TableCell component="th" scope="row">
                                                            {project.name}
                                                        </TableCell>
                                                        <TableCell align="left">{project.description}</TableCell>
                                                        <TableCell align="left">{project.owner.username}</TableCell>
                                                    </TableRow>
                                                ))}


                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            )
                    }
                </div>
                <CreateProjectDialog
                    open={showCreateProject}
                    onClose={() => setShowCreateProject(false)}
                />
            </div >
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    projects: state.project.projects,
    user: state.session.user.username
});

const mapDispatchToProps = ({
    getProjects
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(HomePage));
