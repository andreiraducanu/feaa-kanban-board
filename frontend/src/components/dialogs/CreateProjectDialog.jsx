import React, { useState } from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const styles = (theme) => createStyles({
    root: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    closeButtonContainer: {
        position: 'absolute',
        height: '100%',
        width: '64px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: "24px 0 16px",
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

    const [name, setName] = useState('');
    const [key, setKey] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleKeyChange = (event) => {
        setKey(event.target.value);
    };

    const canBeCreated = () => {
        if (name.length <= 0 || key.length <= 0)
            return false;

        return true;
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Slide}>
                <div className={classes.closeButtonContainer}>
                    <IconButton className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className={classes.root}>
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
                            onChange={handleNameChange}
                        />
                        <TextField
                            id="key"
                            label="Key"
                            margin="normal"
                            variant="outlined"
                            size="small"
                            value={key}
                            onChange={handleKeyChange}
                        />
                        <Button
                            disabled={!canBeCreated()}
                            size="small"
                            variant="contained"
                            color="primary"
                        >
                            Create
                    </Button>
                    </div>
                </div>
            </Dialog>
        </React.Fragment>
    );
};

export default withStyles(styles)(CreateProjectDialog);