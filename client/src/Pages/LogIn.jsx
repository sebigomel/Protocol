import React from 'react'
import { Link } from "react-router-dom";
import './Login.css'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from "@material-ui/core";
import { Typography } from '@material-ui/core/'

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

    const handleSubmit = () => {
        window.location.pathname = "/"
    }

    return (
        <div className="login">

            <img src="/LogoProtocol.png" alt="logo" height="76" width="224" className='icon' />

            <div className="form">
                <Typography variant="h5">Iniciar sesion:</Typography>
                <TextField className='login-input' type='text' label='Nombre de usuario' variant="filled"></TextField>
                <TextField className='login-input' type='password' label='Contraseña' variant="filled"></TextField>
                <div className="form-footer">
                    <Button className='custom-btn' variant='contained' color='primary' onClick={handleSubmit}>Iniciar sesion</Button>
                    <Link href="#">Olvide mi contraseña</Link>
                </div>
            </div>

            <div className="footer">
                <img src="/LogoProtocol.png" alt="logo" height="30"/>
            </div>
        </div>  
    )
}
