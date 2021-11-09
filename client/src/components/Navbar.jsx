import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useHistory } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  logo: {
    width: 135,
    height: 43.54,
  },
});

export default function MenuAppBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const user = props.user;

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.push("/");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Grid justify={"space-between"} container>
            <Grid xs={4} item>
              <img
                className={classes.logo}
                src="/LogoProtocol.png"
                alt="Bosch Logo"
              />
            </Grid>
            <Grid xs={4} item>
              <Grid container justify={"center"}></Grid>
            </Grid>
            <Grid item xs={4} />
          </Grid>
          {props.auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  src={`https://res.cloudinary.com/protocolzz/image/upload/${user.profileImageUrl}`}
                  alt={user.firstName + " " + user.lastName}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
