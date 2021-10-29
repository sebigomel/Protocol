import React, { useEffect, useState } from "react";
import MenuAppBar from "../components/Navbar";
import WorkspaceGrid from "../components/WorkspaceGrid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import RegisterWorkspace from "../components/RegisterWorkspace";

const useStyles = makeStyles((theme) => ({
  customFab: {
    margin: 0,
    top: "auto",
    left: 20,
    bottom: 20,
    right: "auto",
    position: "fixed",
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const headers = new Headers();
    const token = window.localStorage.getItem("token");
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    const userOptions = {
      method: "GET",
      headers: headers,
    };

    fetch("http://localhost:5000/api/user", userOptions)
      .then((res) => {
        if (!res.ok) return;
        else return res.json();
      })
      .then((json) => {
        if (json) {
          setUserData(json);
        }
      });
  }, []);

  const handleCreate = () => {

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuAppBar
        auth={localStorage.getItem("token") ? "true" : "false"}
        fullName={userData.firstName + " " + userData.lastName}
        profileImage={userData.profileImageUrl}
      />
      <WorkspaceGrid />
      <Fab
      onClick={handleClickOpen}
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
        color="primary"
      >
        <AddIcon />
      </Fab>
      <RegisterWorkspace open={open} handleClose={handleClose} />
    </>
  );
}
