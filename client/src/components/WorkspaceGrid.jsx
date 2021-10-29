import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import Workspace from "./Workspace";
import { makeStyles } from "@mui/styles";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

const useStyles = makeStyles({
  containerPadding: {
    padding: "3%",
  },
});

export default function WorkspaceGrid() {
  const classes = useStyles();
  const [userData, setUserData] = useState({});
  const [workspaces, setWorkspaces] = useState([]);

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

    fetch("http://localhost:5000/api/workspace", userOptions)
      .then((res) => {
        if (!res.ok) return;
        else return res.json();
      })
      .then((json) => {
        if (json) {
          console.log(json);
          setWorkspaces(json);
        }
      });

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

  const cld = new Cloudinary({
    cloud: {
      cloudName: "protocolzz",
    },
  });

  return (
    <Container className={classes.containerPadding}>
      <Grid container spacing={3}>
        {workspaces.map((workspace) => (
          <Grid item key={workspace._id} xs={12} sm={6} lg={4}>
            <Workspace
              workspaceImage={<AdvancedImage cldImg={cld
                .image(
                  `https://res.cloudinary.com/protocolzz/image/upload/c_crop,h_150,w_500/${workspace.pictureUrl}.jpg`
                )
                .setDeliveryType("fetch")}></AdvancedImage>}
              admin={workspace.admins.includes(userData._id) ? "true" : "false"}
              name={workspace.name}
              description={workspace.description}
            ></Workspace>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
