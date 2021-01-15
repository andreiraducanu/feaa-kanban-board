import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { BrandLogo } from '../../assets/svg/brand';
import { logoutAction } from '../../redux/actions';
import UserAvatar from '../common/UserAvatar';

const useStyles = makeStyles(theme => ({
    appBar: {
        backgroundColor: 'white'
    },
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
    }
}));

const Header = () => {
    const classes = useStyles();

    const user = useSelector(state => state.session.user);

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
            <AppBar elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.leftContainer}>
                        <BrandLogo className={classes.logo} />
                    </div>
                    <div className={classes.rightContainer}>
                        <Button aria-controls="menu" aria-haspopup="true" onClick={handleProfileClick}>
                            <Typography variant="subtitle1" style={{ marginRight: '12px' }}>
                                {`${user.firstname} ${user.lastname}`}
                            </Typography>
                            <UserAvatar size={32} user={user} />
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