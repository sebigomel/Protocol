import React from "react";
import "./Principal.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Principal() {
  const classes = useStyles();

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      window.location.pathname = "/login";
    } else {
      const token = window.localStorage.getItem("token");
    }
  }, []);

  return (
    <>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="primary"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              Opción 1
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
