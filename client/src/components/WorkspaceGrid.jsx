import React, { useState } from "react";
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

export default function WorkspaceGrid(props) {
  const classes = useStyles();
  let workspaces = props.workspaces
  let userData = props.userData;

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
              admin={
                workspace.admins && workspace.admins.includes(userData._id)
                  ? "true"
                  : "false"
              }
              name={workspace.name}
              description={workspace.description}
              handleDelete={() => props.handleDelete(workspace._id)}
            ></Workspace>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
