import React from 'react'
import './Login.css'

export default function LogIn() {
    return (
        <div className="login">

                <nav class="navbar navbar-dark bg-light custom-nav">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">
                            <img src="/logo512.png" alt="" width="24" height="24" className='nav-icon'/>
                            <span style={{verticalAlign: 'middle'}}>Protocol</span>
                        </a>
                    </div>
                </nav>

            <div className="form">
                <h3>Iniciar sesion:</h3>
                <input className='login-input' type='text' placeholder='Nombre de usuario'></input>
                <input className='login-input' type='password' placeholder='Contraseña'></input>
                <div className="form-footer">
                    <button className='btn btn-primary custom-btn'>Iniciar sesion</button>
                    <a href="#">Olvide mi contraseña</a>
                </div>
            </div>

            <div className="footer">
                <span>Protocol</span>
            </div>
        </div>
    )
}
