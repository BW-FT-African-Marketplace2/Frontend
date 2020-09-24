import React from 'react';
import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
  }));

const Navbar = props => {
    const classes = useStyles();

    return (
        <div>

            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}> African Marketplace </Typography>
                    <nav>
                        <Link variant="button" color="textPrimary" href="/Login" className={classes.link}>
                            LOGIN
                        </Link>
                        <Link variant="button" color="textPrimary" href="/Signup" className={classes.link}>
                            SIGN UP
                        </Link>
                        <Link variant="button" color="textPrimary" href="/Dashboard" className={classes.link}>
                            DASHBOARD
                        </Link>
                    </nav>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;