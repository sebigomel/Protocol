import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SingUp.css";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
import { Typography, Autocomplete, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from "@mui/material/";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

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
  const [showPassword, setShowPassword] = useState(false);
  const [date, setDate] = useState(null);
  const vaccines = [
    "Pfizer",
    "Astrazeneca",
    "Johnson & Johnson",
    "Moderna",
    "Sinopharm",
    "Abdala", 
    "Convidecia",
    "Sputnik Light",
    "CoronaVac",
    "Sputnik V",
    "Janssen",
  ];

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="signup" style={{ overflow: "auto" }}>
      {
        <img
          src="/LogoProtocol.png"
          alt="logo"
          height="76"
          width="224"
          className="icon"
          className="navtomy"
        />
      }

      <div className="form">
        <Typography variant="h5">Crear Cuenta:</Typography>
        <div className="form-fields">
          <TextField
            className="signup-input"
            type="text"
            label="Nombre"
            variant="filled"
            name="firstName"
          ></TextField>

          <TextField
            className="signup-input"
            type="text"
            label="Apellido"
            variant="filled"
            name="lastName"
          ></TextField>

          <TextField
            className="signup-input"
            type="email"
            label="Email"
            variant="filled"
            name="email"
          ></TextField>

          <TextField
            className="signup-input"
            type="password"
            label="Contraseña"
            variant="filled"
            name="password"
            InputProps={{
              type: showPassword ? "text" : "password",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseEnter={handleMouseDownPassword}
                    size="large"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                  <IconButton />
                </InputAdornment>
              ),
            }}
          ></TextField>

          <TextField
            className="signup-input"
            type="password"
            label="Confirmar Contraseña"
            variant="filled"
            name="confirmpassword"
            InputProps={{
              type: showPassword ? "text" : "password",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseEnter={handleMouseDownPassword}
                    size="large"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                  <IconButton />
                </InputAdornment>
              ),
            }}
          ></TextField>

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              className="signup-input"
              openTo="year"
              views={["year", "month", "day"]}
              label="Year, month and date"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} variant="filled" />
              )}
            />
          </LocalizationProvider>
          <div className="form-vaccination signup-input">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={vaccines}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Vaccine" variant="filled" />
              )}
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Doses</FormLabel>
              <RadioGroup
                aria-label="doses"
                defaultValue="1"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="1"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="2"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="form-footer">
          <Button
            className="custom-btn"
            variant="contained"
            color="primary"
            type="submit"
          >
            Crear cuenta
          </Button>
          <Link to="#" className="forgot-pass">
            Ya tengo una cuenta
          </Link>
        </div>
      </div>

      <div className="footer">
        <img src="/LogoProtocol.png" alt="logo" height="25" />
      </div>
    </div>
  );
}
