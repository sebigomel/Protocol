import React from 'react'
import './Login.css'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
    title: {
        flexGrow: 1,
    },
    
}));

export default function LogIn() {
    const classes = useStyles();
    return (
        <div className="login">

            <AppBar color='inherit' className='appbar' position="static">
                <Toolbar>
                    <img src="/logo512.png" alt="" width="24" height="24" className='nav-icon' />
                    <Typography variant="h6" className={classes.title}>
                        Protocol
          </Typography>
          {/* kdnfgkjfhgihgirht4 */}
                </Toolbar>
            </AppBar>

            <div className="form">
                <h3>Iniciar sesion:</h3>
                <input className='login-input' type='text' placeholder='Nombre de usuario'></input>
                <input className='login-input' type='password' placeholder='Contraseña'></input>
                <div className="form-footer">
                    <Button className='custom-btn' variant='contained' color='primary'>Iniciar sesion</Button>
                    <a href="#">Olvide mi contraseña</a>
                </div>
            </div>

            <div className="footer">
                <span>Protocol</span>
            </div>
        </div>
    )
}
