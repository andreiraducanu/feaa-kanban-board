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
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

const styles = createStyles({
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

    const [projects, setProjects] = useState([1]);
    const [projectsFlat, setProjectsFlat] = useState([1]);
    const [showCreateProject, setShowCreateProject] = useState(false);


    const isProjectsEmpty = () => projects.length == 0;

    function displayAllDetailsAboutProject(projectId){
        // console.log(projectId);
        console.log(projectId.owner.username)
    }

    function returnOwnerProject(project){
        // return project.owner.username;
        console.log(project.owner.username)
    }

    useEffect(() => {
        function setStateSynchronous(json) {
            return new Promise(resolve => {
                resolve(setProjects(json));
            });
        } 
        async function doRequest(){
        console.log("aici");
        let user = localStorage.getItem("user");
        let userJson = JSON.parse(user);
        console.log("aici2");
        let res = await fetch(`http://localhost:8080/projects?owner=${userJson.username}`,{

            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
        });
        let resJson = await res.json();
        let arr = [];
        resJson.forEach(element => {
            arr.push({"id": element.id, "description": element.description, "username": element.owner.username, "name": element.name});
        });
        await setStateSynchronous(arr);      
    }

    doRequest();
      },[]);

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
        <div className={classes.root}>
            <CssBaseline />
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
                                        </TableHead>
                                        <TableBody>
                                        {projects.map((project) => (
            
            <TableRow key={project.id} onClick={() => displayAllDetailsAboutProject(project)}>
              <TableCell component="th" scope="row">
                {project.name}
              </TableCell>
              <TableCell align="left">{project.description}</TableCell>
             <TableCell align="left">{project.username}</TableCell>
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
    );
};


export default (withStyles(styles)(HomePage));
