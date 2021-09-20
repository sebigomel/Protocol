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

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.forms.loginform
        const data = new FormData(form)

        const email = data.get('email')
        const pswrd = data.get('password')

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        const body = JSON.stringify({ email: email, password: pswrd })
        const loginOptions = {
            method: 'POST',
            body: body,
            headers: headers
        }

        fetch('http://localhost:5000/api/login', loginOptions)
            .then(res => res.text())
            .then(token => {
                console.log(token);
                window.localStorage.setItem('token', token)
            })
    }

    return (
        <form className="login" onSubmit={handleSubmit} id="loginform">

            <img src="/LogoProtocol.png" alt="logo" height="76" width="224" className='icon' />

            <div className="form">

                <Typography variant="h5">Iniciar sesion:</Typography>
                <TextField className='login-input' type='text' label='Email' variant="filled" name="email"></TextField>
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
