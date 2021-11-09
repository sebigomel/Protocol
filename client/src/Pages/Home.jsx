import React, { useEffect, useState } from "react";
import MenuAppBar from "../components/Navbar";
import WorkspaceGrid from "../components/WorkspaceGrid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import RegisterWorkspace from "../components/RegisterWorkspace";
import { useCopyToClipboard } from "react-use";

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
  const [workspaces, setWorkspaces] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [state, copyToClipboard] = useCopyToClipboard();

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

    fetch("http://localhost:5000/api/workspace", userOptions)
      .then((res) => {
        if (!res.ok) return;
        else return res.json();
      })
      .then((json) => {
        if (json) {
          setWorkspaces(json);
        }
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(
      "Authorization",
      `Bearer ${window.localStorage.getItem("token")}`
    );
    const body = JSON.stringify(data);
    const createWorkspaceOptions = {
      method: "POST",
      body: body,
      headers: headers,
    };

    fetch("http://localhost:5000/api/workspace", createWorkspaceOptions)
      .then((res) => {
        if (!res.ok) {
          res.text().then((text) => console.log(text));
        } else return res.json();
      })
      .then((json) => {
        if (json) {
          setWorkspaces(json);
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInvite = (id) => {
    copyToClipboard(`http://localhost:3000/login?redirectUrl=joinWorkspace/${id}`);
  };

  const handleDelete = (id) => {
    const newWorkspaces = workspaces.filter(
      (workspace) => workspace._id !== id
    );
    setWorkspaces(newWorkspaces);
    const headers = new Headers();
    const token = window.localStorage.getItem("token");
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    const deleteWorkspaceOptions = {
      method: "DELETE",
      headers: headers,
    };

    fetch(`http://localhost:5000/api/workspace/${id}`, deleteWorkspaceOptions)
      .then((res) => {
        if (!res.ok) return;
        else return res.json();
      })
      .then((json) => {
        if (json) {
          setWorkspaces(json);
        }
      });
  };

  return (
    <div overflow="auto">
      <MenuAppBar
        auth={localStorage.getItem("token") ? "true" : "false"}
        user={userData}
      />
      {workspaces.length >= 0 && (
        <WorkspaceGrid
          handleInvite={handleInvite}
          userData={userData}
          workspaces={workspaces}
          handleDelete={handleDelete}
        />
      )}
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
      <RegisterWorkspace
        open={open}
        handleClose={handleClose}
        onSubmit={onSubmit}
      />
    </div>
  );
}
