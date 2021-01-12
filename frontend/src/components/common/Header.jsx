import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { BrandLogo } from '../../assets/svg/brand';
import { logoutAction } from '../../redux/actions';

const useStyles = makeStyles(theme => ({
    toolbar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    leftContainer: {
        flexGrow: 1,
        display: 'flex'
    },
    rightContainer: {
        display: 'flex'
    },
    logo: {
        width: 237.5,
        height: 40
    },
    avatar: {
        width: '32px',
        height: '32px',
        marginLeft: '8px',
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
}));

const Header = () => {
    const classes = useStyles();

    const { firstname, lastname } = useSelector(state => ({
        firstname: state.session.user.firstname,
        lastname: state.session.user.lastname
    }));
    const dispatch = useDispatch();

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    const handleLogout = (event) => {
        setMenuAnchorEl(null);
        dispatch(logoutAction())
    };

    const handleProfileClick = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    return (
        <React.Fragment>
            <AppBar elevation={0} color="default">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.leftContainer}>
                        <BrandLogo className={classes.logo} />
                    </div>
                    <div className={classes.rightContainer}>
                        <Button aria-controls="menu" aria-haspopup="true" onClick={handleProfileClick}>
                            <Typography variant="subtitle1">
                                {`${firstname} ${lastname}`}
                            </Typography>
                            <Avatar className={classes.avatar}>
                                {
                                    firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase()
                                }
                            </Avatar>
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Menu
                id="menu"
                anchorEl={menuAnchorEl}
                keepMounted
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default Header;