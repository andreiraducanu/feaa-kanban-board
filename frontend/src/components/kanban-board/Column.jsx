import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IssueItem from './IssueItem';


const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F4F5F7',
        margin: '8px',
        width: '266px',
        border: '3px solid transparent'
    },
    header: {
        padding: '8px',
    },
    itemList: {
        flexGrow: 1,
        minHeight: '256px',
        padding: '8px',
    },
    isDragging: {
        border: '2px dashed #3B73AF',
        padding: '6px'
    },
    isDraggingOver: {
        border: '2px dashed #14892C',
        padding: '6px'
    },
});


const Column = (props) => {
    const { column, tasks, isDragging } = props;

    const classes = useStyles();

    return (
        <Paper variant='outlined' className={classes.container}>
            <Typography className={classes.header} variant="subtitle2">
                {column.title}
            </Typography>
            <Droppable droppableId={column.id}>
                {(provided, { isDraggingOver }) => (
                    <div
                        className={clsx(
                            classes.itemList,
                            isDraggingOver && classes.isDraggingOver,
                            (!isDraggingOver && isDragging) && classes.isDragging
                        )}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.map((task, index) =>
                            <IssueItem key={task.id} task={task} index={index} />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Paper>
    );
}

export default Column;