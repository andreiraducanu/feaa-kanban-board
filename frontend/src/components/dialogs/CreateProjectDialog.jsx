import React, { useState } from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';
import { createProject } from '../../api/projectApi'

const styles = createStyles({
    closeButtonContainer: {
        position: 'absolute',
        height: '100%',
        width: '64px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: "24px 0 16px",
    },
    content: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
    },
    closeButton: {
        width: '40px',
        height: '40px',
    },
    paper: {
        height: '100%',
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {
        marginBottom: '8px',
    }
});


const CreateProjectDialog = (props) => {
    const {
        open,
        onClose
    } = props;

    const { classes } = props;
    const { createProject } = props
    const { username } = props

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const canBeCreated = () => {
        if (name.length <= 0 || description.length <= 0)
            return false;

        return true;
    };

    const onCreateButton = (event) => {
        event.preventDefault();
        createProject(name, description, username);
    }

    return (
        <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Slide}>
            <div className={classes.closeButtonContainer}>
                <IconButton className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className={classes.content}>
                <div className={classes.paper}>
                    <Typography className={classes.title} component="h1" variant="h5">
                        Create Project
                        </Typography>
                    <TextField
                        id="name"
                        label="Name"
                        margin="normal"
                        variant="outlined"
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        id="description"
                        label="description"
                        margin="normal"
                        variant="outlined"
                        size="small"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button
                        disabled={!canBeCreated()}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={onCreateButton}
                    >
                        Create
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};

const mapStateToProps = (state) => ({
    username: state.session.user.username
})


const mapDispatchToProps = ({
    createProject
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CreateProjectDialog));