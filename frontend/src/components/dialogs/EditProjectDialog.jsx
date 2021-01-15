import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { updateProject } from "../../api/projectsApi";


const styles = theme => createStyles({
    action: {
        marginRight: '8px'
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
    },
});

const EditProjectDialog = ({ projectId, open, onClose, classes }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const canBeUpdated = () => {
        if (name.length <= 0 || description.length <= 0)
            return false;

        return true;
    };

    const handleEditClick = () => {
        dispatch(updateProject(projectId, name, description));
        onClose();

        setName('')
        setDescription('')
    };

    return (
        <React.Fragment>
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">
                    Edit
                </DialogTitle>
                <DialogContent>
                    <TextField
                        className={classes.content}
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
                </DialogContent>
                <DialogActions>
                    <Link className={classes.action} onClick={onClose}>
                        Cancel
                    </Link>
                    <Button
                        disabled={!canBeUpdated()}
                        className={classes.action}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleEditClick}
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}

export default withStyles(styles)(EditProjectDialog);