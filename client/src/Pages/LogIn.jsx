import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Alert } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { InputAdornment } from "@mui/material";

export default function LogIn({ setUserInfo }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.forms.loginform;
    const data = new FormData(form);

    const email = data.get("email");
    const pswrd = data.get("password");

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({ email: email, password: pswrd });
    const loginOptions = {
      method: "POST",
      body: body,
      headers: headers,
    };

    fetch("http://localhost:5000/api/user/login", loginOptions)
      .then((res) => {
        if (!res.ok) {
          res.text().then((text) => setErrorMessage(text));
        } else return res.json();
      })
      .then((json) => {
        if (json) {
          window.localStorage.setItem("token", json.token);
          const parsedJson = [{ ...json }];
          delete parsedJson.token;
          setUserInfo(parsedJson);
          window.location.pathname = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="login" onSubmit={handleSubmit} id="loginform">
      <img
        src="/LogoProtocol.png"
        alt="logo"
        height="76"
        width="224"
        className="icon"
      />

      <div className="form">
        <Typography variant="h5">Iniciar sesion:</Typography>
        <TextField
          className="login-input"
          type="email"
          label="Email"
          variant="filled"
          name="email"
        ></TextField>
        <TextField
          className="login-input"
          type="password"
          label="Contraseña"
          variant="filled"
          name="password"
          InputLabelProps={{
            htmlFor:"standard-adornment-password"
          }}
          InputProps={{
            type : showPassword ? 'text' : 'password',
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                onClick={handleClickShowPassword}
                onMouseEnter={handleMouseDownPassword}
                size="large"/>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                <IconButton />
              </InputAdornment>
            )
          }}
        ></TextField>

        <div className="form-footer">
          <Button
            className="custom-btn"
            variant="contained"
            color="primary"
            type="submit"
          >
            Iniciar sesion
          </Button>
          <Link to="#" className="forgot-pass">
            Olvide mi contraseña
          </Link>
        </div>
        <div className="error-message">
          {errorMessage !== "" && (
            <Alert severity="error"> {errorMessage} </Alert>
          )}
        </div>
      </div>

      <div className="footer">
        <img src="/LogoProtocol.png" alt="logo" height="25" />
      </div>
    </form>
  );
}
