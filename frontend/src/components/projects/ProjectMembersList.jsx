import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import UserAvatar from '../common/UserAvatar';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
}));

const ProjectMembers = ({ members }) => {
    const classes = useStyles();

    return members.length == 0 ?
        (
            <Typography variant="subtitle1">
                No members in this project
            </Typography>
        ) :
        (
            <List dense className={classes.root}>
                {
                    members.map((member, index) => (
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <UserAvatar user={member} size={36} />
                            </ListItemAvatar>
                            <ListItemText primary={`${member.firstname} ${member.lastname}`} />
                        </ListItem>
                    ))
                }
            </List>
        );
}

export default ProjectMembers;