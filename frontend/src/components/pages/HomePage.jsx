import React, { useState, useEffect } from 'react';
import { createStyles, withStyles, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { EmptyImage } from '../../assets/svg/icons';
import { CreateProjectDialog, SimpleDialog } from '../dialogs';
import Header from '../common/Header';
import { deleteProject, getProjects } from "../../api/projectApi";
import { connect } from "react-redux";
import TableRow from '@material-ui/core/TableRow';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';

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

// const useStyles = makeStyles({
//     avatar: {
//         backgroundColor: blue[100],
//         color: blue[600],
//     },
//     btn: {
//         width: "20%",
//         height: "10% !important",
//         margin: "auto",
//         marginBottom: "5%"
//     },
// });

// SimpleDialog.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     open: PropTypes.bool.isRequired,
//     selectedValue: PropTypes.string.isRequired,
// };

// function SimpleDialog(props) {
//     const classes = useStyles();
//     const { onClose, selectedValue, open, deleteProject } = props;

//     const handleClose = () => {
//         console.log("am iesit", selectedValue);
//         onClose(selectedValue);
//     };

//     const handleListItemClick = (value) => {
//         onClose(value);
//     };

//     function deleteProj() {
//         console.log(`sunt in delete si sterg ${selectedValue}`);
//         deleteProject(selectedValue);
//     }

//     return (
//         <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
//             <DialogTitle id="simple-dialog-title">Are you sure you want to delete this project?</DialogTitle>
//             <Button
//                 variant="contained"
//                 color="secondary"
//                 className={classes.button, classes.btn}
//                 onClick={deleteProj}
//                 startIcon={<DeleteIcon />}
//             >
//                 Delete
//       </Button>
//         </Dialog>
//     );
// }




const HomePage = (props) => {
    const { classes } = props;

    const [showCreateProject, setShowCreateProject] = useState(false);
    const { projects, getProjects, deleteProject } = props;
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

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(1);

    function displayAllDetailsAboutProject(project) {
        console.log(project.id);
    }

    function deleteProjectSelected(project) {
        console.log("delete project");
        handleClickOpen(project.id);
        console.log(project.id);
    }

    const handleClickOpen = (id) => {
        setOpen(true);
        setSelectedValue(id);
        console.log("valoarea este", selectedValue);
    };

    const handleCloseDiag = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    function editProject(project) {
        console.log("edit project");
        console.log(project.id);
    }

    function addMemberProject(project) {
        console.log("add member project");
        console.log(project.id);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                                                <TableCell>Description</TableCell>
                                                <TableCell>Lead</TableCell>
                                                <TableCell></TableCell>
                                            </TableHead>
                                            <TableBody>

                                                {projects.map((project) => (

                                                    <TableRow key={project.id}>
                                                        <TableCell component="th" scope="row" onClick={() => displayAllDetailsAboutProject(project)} >
                                                            {project.name}
                                                        </TableCell>
                                                        <TableCell align="left" onClick={() => displayAllDetailsAboutProject(project)}>{project.description} </TableCell>
                                                        <TableCell align="left" onClick={() => displayAllDetailsAboutProject(project)}>{project.owner.username}</TableCell>
                                                        <TableCell align="right">
                                                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>   <MenuIcon></MenuIcon> </Button>
                                                            <Menu
                                                                id="simple-menu"
                                                                anchorEl={anchorEl}
                                                                keepMounted
                                                                open={Boolean(anchorEl)}
                                                                onClose={handleClose}
                                                            >
                                                                <MenuItem onClick={() => deleteProjectSelected(project)}>Delete</MenuItem>
                                                                <MenuItem onClick={() => editProject(project)}>Edit project</MenuItem>
                                                                <MenuItem onClick={() => addMemberProject(project)}>Add member</MenuItem>
                                                            </Menu>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}

                                                <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleCloseDiag} />
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
    user: state.session.user.username,
});

const mapDispatchToProps = ({
    getProjects
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(HomePage));
