import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { CreateIssueDialog } from '../dialogs';
import { logoutAction } from '../../redux/actions';

const styles = (theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    appBarShadow: {
        height: '4px',
        background: "linear-gradient(180deg,rgba(9,30,66,0.13) 0,rgba(9,30,66,0.13) 1px,rgba(9,30,66,0.08) 1px,rgba(9,30,66,0) 4px)"
    },
    toolbar: {
        minHeight: '56px'
    },
    leftContainer: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center'
    },
    rightContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    createButton: {
        marginLeft: '24px'
    },
    avatar: {
        width: '32px',
        height: '32px',
        marginLeft: '8px',
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
});

const Header = (props) => {
    const {
        firstname,
        lastname
    } = props;
    const { logoutAction } = props;
    const { classes } = props;

    const [showCreateIssue, setShowCreateIssue] = useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    const handleLogout = (event) => {
        setMenuAnchorEl(null);
        logoutAction()
    };

    const handleProfileClick = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    return (
        <React.Fragment>
            <AppBar elevation={0} position="relative" color="transparent">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.leftContainer}>
                        <Typography variant="h6">
                            Kanban Board
                    </Typography>
                        <Button
                            className={classes.createButton}
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => setShowCreateIssue(true)}
                        >
                            Create
                        </Button>
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
                <div className={classes.appBarShadow} />
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
            {/* <CreateIssueDialog
                open={showCreateIssue}
                onClose={() => setShowCreateIssue(false)}
            /> */}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    firstname: state.session.user.firstname,
    lastname: state.session.user.lastname
});

const mapDispatchToProps = ({
    logoutAction
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Header));