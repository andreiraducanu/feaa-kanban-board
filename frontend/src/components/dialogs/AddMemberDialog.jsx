import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ComboBox from '../controls/ComboBox';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { getUsers } from "../../api/userApi";
import { addMember } from '../../api/projectsApi'


const styles = theme => createStyles({
    action: {
        marginRight: '8px'
    },
    item: {
        marginBottom: theme.spacing(3),
    },
    itemSmall: {
        width: 244
    },
    addMemberButton: {
        backgroundColor: theme.palette.error.main,
        color: '#FFF'
    },
});

const AddMemberDialog = ({ projectId, open, onClose, classes }) => {
    const [users, setUsers] = useState(null)
    const [memberUsername, setMemberUsername] = useState('')

    const dispatch = useDispatch();

    const canBeAdded = () => {
        if (memberUsername.length <= 0)
            return false;

        return true;
    };

    const handleAddMemberClick = (event) => {
        event.preventDefault();

        console.log("Test in handle button" + projectId + memberUsername)

        dispatch(addMember(projectId, memberUsername));

        setMemberUsername('')

        onClose();
    };

    useEffect(() => {

        console.log("Test in usse efect " + projectId)
        const fetchUsers = async () => {
            const result = await getUsers(projectId)
            setUsers(result.data)
        }

        fetchUsers()

    }, [open == true])

    return (
        <React.Fragment>
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">
                    Add members
                </DialogTitle>
                <DialogContent>
                    <ComboBox
                        className={clsx(classes.item, classes.itemMedium)}
                        label="Members"
                        required
                        getOptionLabel={(option) => option.username}
                        options={users ? users : []}
                        onChange={(value) => setMemberUsername(value.username)}
                    />
                </DialogContent>
                <DialogActions>
                    <Link className={classes.action} onClick={onClose}>
                        Cancel
                    </Link>
                    <Button
                        disabled={!canBeAdded()}
                        className={clsx(classes.action, classes.deleteButton)}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleAddMemberClick}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default withStyles(styles)(AddMemberDialog);