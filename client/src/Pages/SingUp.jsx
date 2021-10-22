import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import './SingUp.css'
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { TextField } from "@mui/material";
import { Typography } from '@mui/material/';

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
    <div className="signup"
    // style={{overflow: "auto"}}
    >

        { <img src="/LogoProtocol.png" alt="logo" height="76" width="224" className='icon' className='navtomy'/>}


        <div className="form">

            <Typography variant="h5">Crear Cuenta:</Typography>
            <TextField 
                className='login-input' 
                type='text' label='User' 
                variant="filled" 
                name="user">
            </TextField>

            <TextField 
                className='login-input' 
                type='email' 
                label='Email' 
                variant="filled" 
                name="email">
            </TextField>

            <TextField 
                className='login-input' 
                type='password' 
                label='Contraseña' 
                variant="filled" 
                name="password" >
            </TextField>

            <TextField 
                className='login-input' 
                type='password' 
                label='Confirmar Contraseña' 
                variant="filled" 
                name="confirmpassword">
            </TextField>

            <TextField 
                className='login-input' 
                type='text' 
                label='Razón/Empresa' 
                variant="filled" 
                name="razon/empresa">
            </TextField>

            <TextField className='login-input' type='text' label='User' variant="filled" name="user"></TextField>
            <TextField className='login-input' type='email' label='Email' variant="filled" name="email"></TextField>
            <TextField className='login-input' type='password' label='Contraseña' variant="filled" name="password"></TextField>
            <TextField className='login-input' type='password' label='Confirmar Contraseña' variant="filled" name="confirmpassword"></TextField>
            <TextField className='login-input' type='text' label='Razón/Empresa' variant="filled" name="razon/empresa"></TextField>
            
            <TextField className='login-input' type='text' label='User' variant="filled" name="user"></TextField>
            <TextField className='login-input' type='email' label='Email' variant="filled" name="email"></TextField>
            <TextField className='login-input' type='password' label='Contraseña' variant="filled" name="password"></TextField>
            <TextField className='login-input' type='password' label='Confirmar Contraseña' variant="filled" name="confirmpassword"></TextField>
            <TextField className='login-input' type='text' label='Razón/Empresa' variant="filled" name="razon/empresa"></TextField>
        
            <div className="form-footer">
                <Button className='custom-btn' variant='contained' color='primary' type="submit">Crear cuenta</Button>
                <Link to="#" className='forgot-pass' >Ya tengo una cuenta</Link>
            </div>

        </div> 

        <div className="footer">
            <img src="/LogoProtocol.png" alt="logo" height="25" />
        </div>
    </div>
    )
}

