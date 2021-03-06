import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { DragDropContext } from 'react-beautiful-dnd';
import { moveIssue } from '../../api/projectsApi';
import Column from './Column';

const useStyles = makeStyles({
    container: {
        display: 'flex'
    }
});

const Board = () => {
    const classes = useStyles();

    const project = useSelector(state => state.projects.current);
    const dispatch = useDispatch();

    const [data, setData] = useState(project);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = (result) => {
        setIsDragging(true);
    };

    useEffect(() => {
        setData(project);
    }, [project])

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
            const newIssueIds = Array.from(sourceColumn.issueIds);
            newIssueIds.splice(source.index, 1);
            newIssueIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...sourceColumn,
                issueIds: newIssueIds
            };

            const newData = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn
                }
            };

            setData(newData);

            dispatch(moveIssue(
                project.id,
                draggableId,
                {
                    sourceColumnId: sourceColumn.id,
                    destinationColumnId: destinationColumn.id,
                    destinationIndex: destination.index
                }
            ));

            return;
        }

        // Moving from one column to another
        const newSourceIssueIds = Array.from(sourceColumn.issueIds);
        newSourceIssueIds.splice(source.index, 1);

        const newSourceColumn = {
            ...sourceColumn,
            issueIds: newSourceIssueIds
        };

        const newDestinationIssueIds = Array.from(destinationColumn.issueIds);
        newDestinationIssueIds.splice(destination.index, 0, draggableId);

        const newDestinationColumn = {
            ...destinationColumn,
            issueIds: newDestinationIssueIds
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

        dispatch(moveIssue(
            project.id,
            draggableId,
            {
                sourceColumnId: sourceColumn.id,
                destinationColumnId: destinationColumn.id,
                destinationIndex: destination.index
            }
        ));
    };

    return (
        <DragDropContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className={classes.container}>
                {data.columnOrder.map(columnId => {
                    const column = data.columns[columnId];
                    const issues = column.issueIds.map(issueId => data.issues[issueId]);

                    return (
                        <Column key={columnId} column={column} issues={issues} isDragging={isDragging} />
                    );
                })}
            </div>
        </DragDropContext>
    );
};


export default Board;