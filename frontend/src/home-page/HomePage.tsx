import React, { useState } from 'react';
import clsx from 'clsx';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { EmptyImage } from '../assets/svg/icons';
import CreateProjectDialog from './CreateProjectDialog';

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    appBarShadow: {
        height: '4px',
        background: "linear-gradient(180deg,rgba(9,30,66,0.13) 0,rgba(9,30,66,0.13) 1px,rgba(9,30,66,0.08) 1px,rgba(9,30,66,0) 4px)"
    },
    toolbar: {
        minHeight: '56px'
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

interface HomePageProps extends WithStyles<typeof styles> {

}

const HomePage = (props: HomePageProps): JSX.Element => {
    const { classes } = props;

    const [projects, setProjects] = useState<any[]>([1]);
    const [showCreateProject, setShowCreateProject] = useState<boolean>(false);

    const isProjectsEmpty = (): boolean => projects.length == 0;

    const CreateProjectButton = (): JSX.Element => (
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
        <div className={classes.root}>
            <CssBaseline />
            <AppBar elevation={0} position="relative" color="transparent">
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6">
                        Kanban Board
                    </Typography>
                    <Button size="small" variant="contained" color="primary">
                        Create
                    </Button>
                </Toolbar>
                <div className={classes.appBarShadow} />
            </AppBar>
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
                                <Table>
                                    <TableHead>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Key</TableCell>
                                        <TableCell>Lead</TableCell>
                                    </TableHead>
                                </Table>
                            </div>
                        )
                }
            </div>
            <CreateProjectDialog
                open={showCreateProject}
                onClose={() => setShowCreateProject(false)}
            />
        </div >
    );
};

export default withStyles(styles)(HomePage);