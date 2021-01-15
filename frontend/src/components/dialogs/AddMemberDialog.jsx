import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
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


const useStyles = makeStyles(theme => ({
    action: {
        marginRight: '8px'
    },
    item: {
        marginBottom: theme.spacing(3),
        width: 488
    },
    addMemberButton: {
        backgroundColor: theme.palette.error.main,
        color: '#FFF'
    },
}));

const AddMemberDialog = ({ projectId, open, onClose }) => {
    const [users, setUsers] = useState(null)
    const [memberUsername, setMemberUsername] = useState('')

    const dispatch = useDispatch();
    const classes = useStyles();

    const canBeAdded = () => memberUsername.length > 0;

    const handleAddMemberClick = (event) => {
        dispatch(addMember(projectId, memberUsername));
        setMemberUsername('')
        onClose();
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await getUsers(projectId)
            setUsers(result.data)
        };

        if (open == true) {
            fetchUsers();
        }

    }, [open])

    return (
        <React.Fragment>
            <Dialog
                aria-labelledby="simple-dialog-title"
                onClose={onClose}
                open={open}
            >
                <DialogTitle id="simple-dialog-title">
                    Add new member to team
                </DialogTitle>
                <DialogContent>
                    <ComboBox
                        className={classes.item}
                        label="User"
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
                        className={classes.action}
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

export default AddMemberDialog;