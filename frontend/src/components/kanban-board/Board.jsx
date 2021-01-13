import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

const useStyles = makeStyles({
    container: {
        display: 'flex'
    }
});

const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Take out the garbage' },
        'task-2': { id: 'task-2', content: 'Watch my favorite show' },
        'task-3': { id: 'task-3', content: 'Charge my phone' },
        'task-4': { id: 'task-4', content: 'Cook dinner' },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Backlog',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        },
        'column-2': {
            id: 'column-2',
            title: 'To do',
            taskIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: 'In Progress',
            taskIds: [],
        },
        'column-4': {
            id: 'column-4',
            title: 'Done',
            taskIds: [],
        }
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4']
};

const Board = () => {
    const classes = useStyles();

    const [data, setData] = useState(initialData);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = (result) => {
        setIsDragging(true);
    };

    const handleDragEnd = (result) => {
        setIsDragging(false);

        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const sourceColumn = data.columns[source.droppableId];
        const destinationColumn = data.columns[destination.droppableId];

        if (sourceColumn === destinationColumn) {
            const newTasksIds = Array.from(sourceColumn.taskIds);
            newTasksIds.splice(source.index, 1);
            newTasksIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...sourceColumn,
                taskIds: newTasksIds
            };

            const newData = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn
                }
            };

            setData(newData);

            return;
        }

        // Moving from one column to another
        const newSourceTaskIds = Array.from(sourceColumn.taskIds);
        newSourceTaskIds.splice(source.index, 1);

        const newSourceColumn = {
            ...sourceColumn,
            taskIds: newSourceTaskIds
        };

        const newDestinationTaskIds = Array.from(destinationColumn.taskIds);
        newDestinationTaskIds.splice(destination.index, 0, draggableId);

        const newDestinationColumn = {
            ...destinationColumn,
            taskIds: newDestinationTaskIds
        };

        const newData = {
            ...data,
            columns: {
                ...data.columns,
                [newSourceColumn.id]: newSourceColumn,
                [newDestinationColumn.id]: newDestinationColumn
            }
        }

        setData(newData);
    };

    return (
        <DragDropContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className={classes.container}>
                {
                    data.columnOrder.map(columnId => {
                        const column = data.columns[columnId];
                        const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

                        return <Column key={columnId} isDragging={isDragging} column={column} tasks={tasks} />
                    })
                }
            </div>
        </DragDropContext>
    );
};


export default Board;