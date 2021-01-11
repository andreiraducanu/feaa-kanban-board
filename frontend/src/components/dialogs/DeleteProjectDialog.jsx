import React from 'react';
import { useDispatch } from 'react-redux';
import { createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { deleteProject } from "../../api/projectsApi";


const styles = theme => createStyles({
    action: {
        marginRight: '8px'
    },
    deleteButton: {
        backgroundColor: theme.palette.error.main,
        color: '#FFF'
    },
});

const DeleteProjectDialog = ({ projectId, open, onClose, classes }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteProject(projectId));
        onClose();
    };

    return (
        <React.Fragment>
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">
                    Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this project?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link className={classes.action} onClick={onClose}>
                        Cancel
                    </Link>
                    <Button
                        className={clsx(classes.action, classes.deleteButton)}
                        size="small"
                        variant="contained"
                        onClick={handleDelete}
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default withStyles(styles)(DeleteProjectDialog);