import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const ProjectMembers = ({ members }) => {
    const classes = useStyles();

    return (
        <List dense className={classes.root}>
            {members.map((member, index) => (
                <ListItem key={index} button>

                    <ListItemAvatar>
                        <Avatar>
                            {
                                member.firstname.charAt(0).toUpperCase() + member.lastname.charAt(0).toUpperCase()
                            }
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${member.firstname} ${member.lastname}`} />
                </ListItem>
            ))}
        </List>
    );
}

export default ProjectMembers;