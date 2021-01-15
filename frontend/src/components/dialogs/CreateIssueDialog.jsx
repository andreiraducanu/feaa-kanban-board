import React, { useState } from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux'
import { createStyles, withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ComboBox from '../controls/ComboBox';
import Link from '@material-ui/core/Link';
import { EpicIcon, StoryIcon, TaskIcon, BugIcon, SubtaskIcon } from '../../assets/svg/issue-type';
import { HighestIcon, HighIcon, MediumIcon, LowIcon, LowestIcon } from '../../assets/svg/issue-priority';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { createIssue } from '../../api/projectsApi'

const useStyles = makeStyles(theme => ({
    content: {
        display: 'flex',
        flexDirection: 'column'
    },
    bottomMenu: {
        backgroundColor: 'red'
    },
    item: {
        marginBottom: theme.spacing(3),
    },
    itemSmall: {
        width: 244
    },
    itemMedium: {
        width: 488
    },
    actions: {
        paddingRight: '32px'
    },
    optionContainer: {
        display: 'flex',
        padding: '4px',
    },
    optionIcon: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '8px'
    },
    optionLabel: {
        flexGrow: 1
    },
    createAction: {
        marginRight: '16px'
    }
}));


const ISSUE_TYPES = [
    { name: 'Epic', icon: <EpicIcon /> },
    { name: 'Story', icon: <StoryIcon /> },
    { name: 'Task', icon: <TaskIcon /> },
    { name: 'Bug', icon: <BugIcon /> },
    { name: 'Subtask', icon: <SubtaskIcon /> }
];

const ISSUE_PRIORITIES = [
    { name: 'Highest', icon: <HighestIcon /> },
    { name: 'High', icon: <HighIcon /> },
    { name: 'Medium', icon: <MediumIcon /> },
    { name: 'Low', icon: <LowIcon /> },
    { name: 'Lowest', icon: <LowestIcon /> }
];

const CreateIssueDialog = ({ projectId, members, open, onClose }) => {
    const classes = useStyles();

    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [priority, setPriority] = useState('');
    const [assigneeUsername, setAssigneeUsername] = useState('');
    const dispatch = useDispatch();

    const renderIssueOption = (option) => (
        <div className={classes.optionContainer}>
            <div className={classes.optionIcon}>
                {option.icon}
            </div>
            <Typography className={classes.optionLabel} variant="subtitle1">
                {option.name}
            </Typography>
        </div>
    );

    const onCreateButton = (event) => {
        event.preventDefault();
        dispatch(createIssue(projectId, title, type, priority, assigneeUsername));
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth='md'
            scroll='paper'
        >
            <DialogTitle>Create issue</DialogTitle>
            <DialogContent dividers>
                <div className={classes.content}>
                    <ComboBox
                        className={clsx(classes.item, classes.itemSmall)}
                        label="Issue Type"
                        required
                        options={ISSUE_TYPES}
                        getOptionLabel={(option) => option.name}
                        renderOption={renderIssueOption}
                        onChange={(value) => setType(value.name.toUpperCase())}
                    />
                    <TextField
                        className={clsx(classes.item, classes.itemSmall)}
                        label="Title"
                        required
                        variant="outlined"
                        size="small"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <ComboBox
                        className={clsx(classes.item, classes.itemMedium)}
                        label="Assignee"
                        getOptionLabel={(option) => option.username}
                        options={members}
                        onChange={(value) => setAssigneeUsername(value.username)}
                    />
                    <ComboBox
                        className={clsx(classes.item, classes.itemSmall)}
                        label="Priority"
                        options={ISSUE_PRIORITIES}
                        getOptionLabel={(option) => option.name}
                        renderOption={renderIssueOption}
                        onChange={(value) => setPriority(value.name.toUpperCase())}
                    />
                </div>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Link onClick={onClose}>
                    Cancel
                </Link>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    className={classes.createAction}
                    onClick={onCreateButton}
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog >
    );
};


export default CreateIssueDialog;