import React, { useEffect , useState } from 'react'
import { Link } from "react-router-dom";
import './Login.css'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from "@material-ui/core";
import { Typography } from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';

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

export default function LogIn({setUserInfo}) {
    const [errorMessage, setErrorMessage] = useState("")
    const classes = useStyles();

    useEffect(() => {
        /*         const headers = new Headers()
                headers.append('Content-Type', 'application/json')
                const body = JSON.stringify({ token: window.localStorage.getItem("token") })
                const userOptions = {
                    method: 'GET',
                    body: body,
                    headers: headers
                }
        
                fetch('http://localhost:5000/api/user/signin', userOptions)
                    .then(res => res.text())
                    .then(token => {
                        if(token) {
                            window.localStorage.setItem('token', token)
                            window.location.pathname = '/'
                        }
                    }) */
    }, [])


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

        fetch('http://localhost:5000/api/user/login', loginOptions)
            .then(res => { if (res.status === 200) return res.json()})
            .catch(err => /*setErrorMessage(err.message)*/ console.log(err))
            .then(json => {
                if (json) {
                    window.localStorage.setItem('token', json.token)
                    const parsedJson = [{...json}]
                    delete parsedJson.token
                    setUserInfo(parsedJson)
                    console.log(parsedJson)
                    window.location.pathname = '/'
                }
            })
    }

    return (
        <form className="login" onSubmit={handleSubmit} id="loginform">

            <img src="/LogoProtocol.png" alt="logo" height="76" width="224" className='icon' />

            <div className="form">

                <Typography variant="h5">Iniciar sesion:</Typography>
                <TextField className='login-input' type='email' label='Email' variant="filled" name="email"></TextField>
                <TextField className='login-input' type='password' label='Contraseña' variant="filled" name="password"></TextField>

                <div className="form-footer">
                    <Button className='custom-btn' variant='contained' color='primary' type="submit">Iniciar sesion</Button>
                    <Link to="#" className='forgot-pass' >Olvide mi contraseña</Link>
                </div>
                {errorMessage  && <Alert severity="error">{errorMessage}</Alert>}
            </div>

            <div className="footer">
                <img src="/LogoProtocol.png" alt="logo" height="25" />
            </div>
        </form>
    )
}
