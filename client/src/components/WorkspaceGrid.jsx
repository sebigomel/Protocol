import React, { useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import Workspace from "./Workspace";
import { makeStyles } from "@mui/styles";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  containerPadding: {
    padding: "3%",
  },
});

export default function WorkspaceGrid(props) {
  const [admin, setAdmin] = useState();
  const classes = useStyles();
  const history = useHistory();
  let workspaces = props.workspaces;
  let userData = props.userData;

  const handleClick = (id) => {
    history.push(`/workspace/${id}`);
  }

  const cld = new Cloudinary({
    cloud: {
      cloudName: "protocolzz",
    },
  });

  return (
    <Container className={classes.containerPadding}>
      <Grid container spacing={3}>
        {workspaces.map((workspace) => {
          if (!workspace.admins.includes(userData._id)) setAdmin(false);
          return (
            <Grid item key={workspace._id} xs={12} sm={6} lg={4}>
              <Workspace
                id={workspace._id}
                workspaceImage={
                  <AdvancedImage
                    cldImg={cld
                      .image(
                        `https://res.cloudinary.com/protocolzz/image/upload/c_crop,h_150,w_500/${workspace.pictureUrl}.jpg`
                      )
                      .setDeliveryType("fetch")}
                  ></AdvancedImage>
                }
                admin={admin}
                name={workspace.name}
                description={workspace.description}
                handleClick={() => handleClick(workspace._id)}
                handleDelete={() => props.handleDelete(workspace._id)}
                handleInvite={() => props.handleInvite(workspace._id)}
              ></Workspace>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
