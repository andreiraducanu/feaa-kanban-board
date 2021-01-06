import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actions';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { BrandLogo } from '../../assets/svg/brand';
import { Redirect } from "react-router-dom";
import AccountRightArtwork from '../../assets/svg/artwork/account_right.svg';
import AccountLeftArtwork from '../../assets/svg/artwork/account_left.svg';
import SnackBar from '../common/SnackBar';

const styles = (theme) => createStyles({
    root: {
        height: '100vh',
        width: '100vw',
        backgroundColor: '#FAFBFC',
        backgroundImage: `url(${AccountLeftArtwork}), url(${AccountRightArtwork})`,
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundAttachment: 'fixed, fixed',
        backgroundSize: '368px, 368px',
        backgroundPosition: 'left bottom, right bottom',

        [theme.breakpoints.down('lg')]: {
            backgroundSize: 'calc(((100vw - 400px) / 2) - 32px), calc(((100vw - 400px) / 2) - 32px), cover',
        },
    },
    header: {
        padding: '40px 0',
    },
    logo: {
        maxHeight: '40px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        width: '400px',
        padding: '32px 40px',
        background: 'rgb(255, 255, 255)',
        borderRadius: '3px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px',
        boxSizing: 'border-box',
        color: 'rgb(94, 108, 132)'
    },
    title: {
        fontSize: '16px',
        fontWeight: 500,
    },
    form: {
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

const LoginPage = (props) => {
    const {
        errorMessage,
        isAuthenticated } = props;
    const { login } = props;
    const { classes } = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        login(username, password);
    };

    const validateForm = () => (username.length > 0 && password.length > 0);

    if (isAuthenticated) {
        return <Redirect to={{ pathname: '/' }} />;
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <div className={classes.header}>
                    <BrandLogo className={classes.logo} />
                </div>
                <div className={classes.content}>
                    <Typography className={classes.title} color="inherit" variant="subtitle1">
                        Log in to your account
                    </Typography>
                    <form className='{classes.form}' onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    size="small"
                                    id="username"
                                    name="username"
                                    label="Username"
                                    autoComplete="username"
                                    autoFocus
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    size="small"
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!validateForm()}
                        >
                            Log in
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link component={RouterLink} to="/signup" variant="body2">
                                    Sign up for an account
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                {errorMessage &&
                    (
                        <SnackBar
                            severity='error'
                            message={errorMessage}
                        />
                    )
                }
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    errorMessage: state.login.errorMessage,
    isAuthenticated: state.login.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
    login: (username, password) => dispatch(login(username, password))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(LoginPage));