import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import './SingUp.css'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from "@material-ui/core";
import { Typography } from '@material-ui/core/';

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

export default function Singup() {
    const classes = useStyles();
    
    return (
    <form className="singup">

        <img src="/LogoProtocol.png" alt="logo" height="76" width="224" className='icon' />

        <div className="form">

            <Typography variant="h5">Crear Cuenta:</Typography>
            <TextField cqlassName='login-input' type='email' label='Email' variant="filled" name="email"></TextField>
            <TextField className='login-input' type='password' label='Contraseña' variant="filled" name="password"></TextField>

            <div className="form-footer">
                <Button className='custom-btn' variant='contained' color='primary' type="submit">Iniciar sesion</Button>
                <Link to="#" className='forgot-pass' >Olvide mi contraseña</Link>
            </div>

        </div>

        <div className="footer">
            <img src="/LogoProtocol.png" alt="logo" height="25" />
        </div>
    </form>
    )
}

