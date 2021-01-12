import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IssueItemList from './IssueItemList';

const useStyles = makeStyles(theme => ({
    container: {
        width: '266px',
        backgroundColor: '#EBECF0'
    },
    header: {
        padding: '8px',
    },
    content: {
        padding: '8px',
    }
}));


const Column = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography className={classes.header} variant="h6">
                Name
            </Typography>
            <Divider />
            <div className={classes.content}>
                <IssueItemList />
            </div>
        </div>
    );
}

export default Column;