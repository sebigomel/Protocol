import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateRole from "./CreateRole";
import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const RoleListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function Roles(props) {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const { workspaceId } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onSubmit = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(
      "Authorization",
      `Bearer ${window.localStorage.getItem("token")}`
    );
    const body = JSON.stringify(data);
    const createRoleOptions = {
      method: "POST",
      body: body,
      headers: headers,
    };

    fetch(`http://localhost:5000/api/role/${workspaceId}`, createRoleOptions)
      .then((res) => {
        if (!res.ok) {
          res.text().then((text) => console.log(text));
        } else return res.json();
      })
      .then((json) => {
        if (json) {
          setRoles(json);
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const headers = new Headers();
    const token = window.localStorage.getItem("token");
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    fetch(`http://localhost:5000/api/role/${props.workspaceId}`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        if (!res.ok) return;
        else return res.json();
      })
      .then((json) => {
        if (json) {
          setRoles(json);
        }
      });
  }, [props.workspaceId]);

  const handleDelete = (roleToDelete) => () => {
    console.log(roleToDelete);
    setRoles((roles) => roles.filter((role) => role._id !== roleToDelete._id));
    const headers = new Headers();
    headers.append(
      "Authorization",
      `Bearer ${window.localStorage.getItem("token")}`
    );
    const deleteRoleOptions = {
      method: "DELETE",
      headers: headers,
    };

    fetch(
      `http://localhost:5000/api/role/${roleToDelete._id}`,
      deleteRoleOptions
    )
      .then((res) => {
        if (!res.ok) {
          res.text().then((text) => console.log(text));
        } else return res.json();
      })
      .then((json) => {
        if (json) {
          setRoles(json);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className="roles-container">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
              height: "fit-content",
            }}
            component="ul"
          >
            {roles.map((role) => {
              return (
                <RoleListItem key={role._id}>
                  <Chip label={role.name} onDelete={handleDelete(role)} />
                </RoleListItem>
              );
            })}
            <ListItem>
              <Chip
                label="Add role"
                color="primary"
                icon={<AddCircleOutlineIcon />}
                onClick={handleClickOpen}
              />
            </ListItem>
          </Paper>
        </Grid>
      </Grid>
      <CreateRole
        open={open}
        handleClose={handleClose}
        devices={props.devices}
        onSubmit={onSubmit}
      />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Sandra Adams
                </Typography>
                {" — Do you have Paris recommendations? Have you ever…"}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Container>
  );
}
