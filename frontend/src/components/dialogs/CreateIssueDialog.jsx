import React from 'react';
import clsx from 'clsx';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ComboBox from '../controls/ComboBox';
import Link from '@material-ui/core/Link';
import { EpicIcon, StoryIcon, TaskIcon, BugIcon, SubtaskIcon } from '../../assets/svg/issue-type'
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

const styles = (theme) => createStyles({
    dialogPaper: {
        height: '80vh'
    },
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
});


const ISSUE_TYPES = [
    { name: 'Epic', icon: <EpicIcon /> },
    { name: 'Story', icon: <StoryIcon /> },
    { name: 'Task', icon: <TaskIcon /> },
    { name: 'Bug', icon: <BugIcon /> },
    { name: 'Subtask', icon: <SubtaskIcon /> }
];

const CreateIssueDialog = (props) => {
    const {
        open,
        onClose
    } = props;

    const { classes } = props;

    const renderIssueType = (issueType) => (
        <div className={classes.optionContainer}>
            <div className={classes.optionIcon}>
                {issueType.icon}
            </div>
            <Typography className={classes.optionLabel} variant="subtitle1">
                {issueType.name}
            </Typography>
        </div>
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth='md'
            scroll='paper'
            classes={{ paper: classes.dialogPaper }}
        >
            <DialogTitle>Create issue</DialogTitle>
            <DialogContent dividers>
                <div className={classes.content}>
                    <ComboBox
                        className={clsx(classes.item, classes.itemSmall)}
                        label="Project"
                        required
                        options={["test1", "test2", "test3"]}
                    />
                    <ComboBox
                        className={clsx(classes.item, classes.itemSmall)}
                        label="Issue Type"
                        required
                        options={ISSUE_TYPES}
                        getOptionLabel={(option) => option.name}
                        renderOption={renderIssueType}
                        onChange={(value) => console.log(value)}
                    />
                    <TextField
                        className={clsx(classes.item, classes.itemSmall)}
                        label="Title"
                        required
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        className={clsx(classes.item)}
                        label="Description"
                        multiline
                        rows={5}
                        variant="outlined"
                        size="small"
                    />
                    <ComboBox
                        className={clsx(classes.item, classes.itemMedium)}
                        label="Reporter"
                        required
                        options={["test1", "test2", "test3"]}
                    />
                    <ComboBox
                        className={clsx(classes.item, classes.itemMedium)}
                        label="Assignee"
                        options={["test1", "test2", "test3"]}
                    />
                    <ComboBox
                        className={clsx(classes.item, classes.itemSmall)}
                        label="Priority"
                        options={["test1", "test2", "test3"]}
                    />
                </div>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    className={classes.createAction}
                >
                    Create
                </Button>
                <Link onClick={onClose}>
                    Cancel
                </Link>
            </DialogActions>
        </Dialog>
    );
};

export default withStyles(styles)(CreateIssueDialog);