import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    avatar: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500]
    }
}));

const UserAvatar = ({ user, size }) => {
    const classes = useStyles();


    return (
        <Avatar className={classes.avatar} style={{ height: size, width: size }}>
            {user.firstname.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase()}
        </Avatar>
    );
};

export default UserAvatar;