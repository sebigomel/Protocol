import React from 'react'
import './Principal.css'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

export default function Principal() {
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>

                        <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu">
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" className={classes.title}>
                            Opción 1
                        </Typography>

                    </Toolbar>
                </AppBar>
            </div>
        </>
    );
}
