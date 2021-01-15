import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { ISSUE_TYPES, ISSUE_PRIORITIES } from '../../constants/issue';

const useStyles = makeStyles({
    container: {
        padding: '8px',
        marginBottom: '8px',
        "&:hover": {
            backgroundColor: '#EAEAEA'
        }
    },
    isDragging: {
        backgroundColor: '#E6F1FF'
    }
});

const IssueItem = ({ issue, index }) => {

    const classes = useStyles();

    const type = ISSUE_TYPES[issue.type];
    const priority = ISSUE_PRIORITIES[issue.priority];

    return (
        <Draggable draggableId={issue.id} index={index}>
            {(provided, { isDragging }) => (
                <Paper
                    variant='outlined'
                    className={clsx(classes.container, isDragging && classes.isDragging)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    innerRef={provided.innerRef}
                >
                    <Grid container direction='column' spacing={1}>
                        <Grid item>
                            <Typography variant="body2">
                                {issue.title}
                            </Typography>
                        </Grid>
                        <Grid item container justify='space-between'>
                            <Grid item>
                                <Tooltip title={type.name} arrow>
                                    {type.icon}
                                </Tooltip>
                                <Tooltip title={priority.name} arrow>
                                    {priority.icon}
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                {issue.assignee.firstname.charAt(0).toUpperCase() + issue.assignee.lastname.charAt(0).toUpperCase()}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Draggable>
    );
};

export default IssueItem;