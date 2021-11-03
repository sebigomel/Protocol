import React, { useEffect, useState } from "react";
import MenuAppBar from "../components/Navbar";
import { useParams } from "react-router-dom";
import WorkspaceTabs from "../components/WorkspaceTabs";
import Registers from "../components/Registers";
import Devices from "../components/Devices";
import Roles from "../components/Roles";
import { createTheme, darken, lighten } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) => {
    const getBackgroundColor = (color) =>
      theme.palette.mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

    const getHoverBackgroundColor = (color) =>
      theme.palette.mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

    return {
      root: {
        "& .super-app-theme--Accepted": {
          backgroundColor: getBackgroundColor(theme.palette.success.main),
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(
              theme.palette.success.main
            ),
          },
        },
        "& .super-app-theme--Rejected": {
          backgroundColor: getBackgroundColor(theme.palette.error.main),
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
          },
        },
      },
    };
  },
  { defaultTheme }
);

export default function WorkspacePage() {
  const classes = useStyles();
  const { workspaceId } = useParams();
  const [userData, setUserData] = useState({});
  const [devices, setDevices] = useState([]);
  const [roles, setRoles] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:5000/api/record/real-time/${workspaceId}`
    );
    eventSource.onmessage = (e) => {
      setRecords(JSON.parse(e.data));
    };
  }, [workspaceId]);

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

    fetch(`http://localhost:5000/api/device/${workspaceId}`, userOptions)
      .then((res) => {
        if (!res.ok) return;
        else return res.json();
      })
      .then((json) => {
        if (json) {
          setDevices(json);
        }
      });

    fetch(`http://localhost:5000/api/role/${workspaceId}`, userOptions)
      .then((res) => {
        if (!res.ok) return;
        else return res.json();
      })
      .then((json) => {
        if (json) {
          setRoles(json);
        }
      });
  }, [workspaceId]);

  return (
    <div overflow="auto" className={classes.root}>
      <MenuAppBar
        workspace="true"
        auth={localStorage.getItem("token") ? "true" : "false"}
        fullName={userData.firstName + " " + userData.lastName}
        profileImage={userData.profileImageUrl}
      />
      <WorkspaceTabs
        registros={<Registers records={records} />}
        puertas={<Devices devices={devices} />}
        roles={<Roles roles={roles} />}
      />
    </div>
  );
}
