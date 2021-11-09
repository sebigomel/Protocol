import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SingUp.css";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { TextField, Alert } from "@mui/material";
import {
  Typography,
  Autocomplete,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Input,
} from "@mui/material/";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
  const history = useHistory();
  const classes = useStyles();
  const [vaccines, setVaccines] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setVaccines([
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
    ]);
    setValue("vaccine", "Pfizer");
  }, [setVaccines, setValue]);

  var myCropWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "protocolzz",
      uploadPreset: "g3a8fl0y",
      cropping: true,
      public_id: uuidv4(),
    },
    (error, result) => {
      if (error) {
        console.error("There was an error while uploading");
      } else {
        console.log(result);
        if (result.event === "success") {
          setValue("profileImageUrl", result.info.path);
        }
      }
    }
  );

  const onSubmit = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    data.username = data.firstName + data.lastName;
    const body = JSON.stringify(data);
    const signUpOptions = {
      method: "POST",
      body: body,
      headers: headers,
    };

    fetch("http://localhost:5000/api/user/signup", signUpOptions)
      .then((res) => {
        if (!res.ok) {
          res.text().then((text) => setErrorMessage(text));
        } else history.push("/login?accountCreated=true");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form
      className="signup"
      onSubmit={handleSubmit(onSubmit)}
      style={{ overflow: "auto" }}
    >
      {
        <img
          src="/LogoProtocol.png"
          alt="logo"
          height="76"
          width="224"
          className="icon navtomy"
        />
      }

      <div className="form">
        <Typography variant="h4">Crear Cuenta:</Typography>
        <div className="form-fields">
          <TextField
            {...register("firstName", { required: true })}
            error={errors.firstName ? true : false}
            label={errors.firstName ? "Error" : "Nombre"}
            helperText={
              errors.firstName?.type === "required" && "El nombre es requerido"
            }
            className="signup-input"
            type="text"
            variant="filled"
            name="firstName"
          ></TextField>

          <TextField
            {...register("lastName", { required: true })}
            error={errors.lastName ? true : false}
            label={errors.lastName ? "Error" : "Apellido"}
            helperText={
              errors.lastName?.type === "required" && "El apellido es requerido"
            }
            className="signup-input"
            type="text"
            variant="filled"
            name="lastName"
          ></TextField>

          <TextField
            {...register("email", { required: true })}
            error={errors.email ? true : false}
            label={errors.email ? "Error" : "Email"}
            helperText={
              errors.email?.type === "required" && "El email es requerido"
            }
            className="signup-input"
            type="email"
            variant="filled"
            name="email"
          ></TextField>

          <TextField
            {...register("password", { minLength: 8, required: true })}
            className="signup-input"
            error={errors.password ? true : false}
            label={errors.password ? "Error" : "Contraseña"}
            helperText={
              errors.password?.type === "required" &&
              "La contraseña es requerida"
            }
            variant="filled"
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
            {...register("passwordCheck", { required: true })}
            className="signup-input"
            label="Confirmar Contraseña"
            variant="filled"
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
            <Controller
              control={control}
              name={"birthdate"}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  className={"signup-input"}
                  openTo={"year"}
                  views={["year", "month", "day"]}
                  label={"Year, month and date"}
                  value={value}
                  onChange={(e) => onChange(e.toDate())}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} variant="filled" />
                  )}
                />
              )}
            />
          </LocalizationProvider>
          <div className="form-vaccination">
            <Controller
              control={control}
              name="vaccine"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  onChange={(event, item) => {
                    onChange(item);
                  }}
                  options={vaccines}
                  value={value}
                  disablePortal
                  id="combo-box-demo"
                  sx={{ width: 300 }}
                  getOptionSelected={(option, value) =>
                    value === undefined ||
                    value === "" ||
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Vaccine" variant="filled" />
                  )}
                />
              )}
            />

            <div className="form-doses">
              <FormControl
                component="fieldset"
                variant="filled"
                className="doses-child"
              >
                <FormLabel component="legend">Dosis </FormLabel>
                <Controller
                  name="doses"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <RadioGroup
                      value={value}
                      onChange={(e) => onChange(parseInt(e.target.value))}
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
                  )}
                />
              </FormControl>
            </div>
          </div>
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              onClick={() => myCropWidget.open()}
            >
              Upload Profile Image
            </Button>
          </label>
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
        {errorMessage && <Alert severity="error"> {errorMessage} </Alert>}
      </div>

      <div className="footer">
        <img src="/LogoProtocol.png" alt="logo" height="25" />
      </div>
    </form>
  );
}
