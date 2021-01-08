import React, { useState } from 'react';
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
import { EpicIcon, StoryIcon, TaskIcon, BugIcon, SubtaskIcon } from '../../assets/svg/issue-type';
import { HighestIcon, HighIcon, MediumIcon, LowIcon, LowestIcon } from '../../assets/svg/issue-priority';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { createIssue } from '../../api/issueApi'

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

const ISSUE_PRIORITIES = [
    { name: 'Highest', icon: <HighestIcon /> },
    { name: 'High', icon: <HighIcon /> },
    { name: 'Medium', icon: <MediumIcon /> },
    { name: 'Low', icon: <LowIcon /> },
    { name: 'Lowest', icon: <LowestIcon /> }
];

const CreateIssueDialog = (props) => {
    const {
        open,
        onClose
    } = props;

    const { classes } = props;
    const { createIssue } = props
    const { projects } = props

    const [project, setProject] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [priority, setPriority] = useState('');
    const [reporterUsername, setReporterUsername] = useState('');
    const [assigneeUsername, setAssigneeUsername] = useState('');
    const [totalWorkTime, setTotalWorkTime] = useState('');

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
        createIssue(project.id, title, description, type, priority, reporterUsername, assigneeUsername, totalWorkTime);
    }

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
                        getOptionLabel={(option) => option.name}
                        options={projects}
                        onChange={(value) => { console.log(value); setProject(value); }}
                    />
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
                    <TextField
                        className={clsx(classes.item)}
                        label="Description"
                        multiline
                        rows={5}
                        variant="outlined"
                        size="small"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <ComboBox
                        className={clsx(classes.item, classes.itemMedium)}
                        label="Reporter"
                        required
                        getOptionLabel={(option) => option.name}
                        options={project && project.members ? project.members : []}
                        onChange={(value) => setReporterUsername(value)}
                    />
                    <ComboBox
                        className={clsx(classes.item, classes.itemMedium)}
                        label="Assignee"
                        getOptionLabel={(option) => option.name}
                        options={project && project.members ? project.members : []}
                        onChange={(value) => setAssigneeUsername(value)}
                    />
                    <ComboBox
                        className={clsx(classes.item, classes.itemSmall)}
                        label="Priority"
                        options={ISSUE_PRIORITIES}
                        getOptionLabel={(option) => option.name}
                        renderOption={renderIssueOption}
                        onChange={(value) => setPriority(value.name.toUpperCase())}
                    />
                    <TextField
                        className={clsx(classes.item)}
                        label="Total work time"
                        required
                        variant="outlined"
                        size="small"
                        onChange={(e) => setTotalWorkTime(e.target.value)}
                    />
                </div>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    className={classes.createAction}
                    onClick={onCreateButton}
                >
                    Create
                </Button>
                <Link onClick={onClose}>
                    Cancel
                </Link>
            </DialogActions>
        </Dialog >
    );
};

const mapStateToProps = (state) => ({
    projects: state.project.projects,
})

const mapDispatchToProps = ({
    createIssue
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CreateIssueDialog));