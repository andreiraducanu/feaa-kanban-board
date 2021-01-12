import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { ISSUE_TYPES, ISSUE_PRIORITIES } from '../../constants/issue';

const useStyles = makeStyles({
    root: {
        "&:hover": {
            backgroundColor: '#EBEBEB'
        }
    }
});

const IssueItem = () => {
    const classes = useStyles();

    const issue = {
        title: 'Test',
        type: 'EPIC',
        priority: 'HIGH'
    }

    const type = ISSUE_TYPES[issue.type];
    const priority = ISSUE_PRIORITIES[issue.priority];

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container direction='column' spacing={1}>
                    <Grid item>
                        <Typography variant="body2">
                            Test
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
                            PJ
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default IssueItem;