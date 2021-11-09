import React, { useEffect, useState } from "react";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
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
import { randomColor } from "randomcolor";
import Color from "color";
import AddCardId from "./AddCardId";

const RoleListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function Roles(props) {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const { workspaceId } = useParams();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [openAddCardId, setOpenAddCardId] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onSubmit = (data) => {
    setLoading(true);
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
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAddCardId = (user) => () => {
    setUser(user);
    setOpenAddCardId(true);
    const headers = new Headers();
    const token = window.localStorage.getItem("token");
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    fetch(`http://localhost:5000/api/user/startWaiting/${user._id}`, {
      method: "GET",
      headers: headers,
    }).then((res) => {
      if (!res.ok) console.log(res);
      else return console.log("user waiting");
    });
  };

  const handleCloseAddCardId = () => {
    setOpenAddCardId(false);
    const headers = new Headers();
    const token = window.localStorage.getItem("token");
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    fetch(`http://localhost:5000/api/user/stopWaiting/${user._id}`, {
      method: "GET",
      headers: headers,
    }).then((res) => {
      if (!res.ok) console.log(res);
      else return console.log("user stopped waiting");
    });
  };

  const handleDrop = (e) => {
    const headers = new Headers();
    const token = window.localStorage.getItem("token");
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    fetch(
      `http://localhost:5000/api/role/assign/${e.dropData._id}/${e.dragData._id}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => {
        if (!res.ok) return;
        else return res.json();
      })
      .then((json) => {
        if (json) {
          const index = users.findIndex((user) => user._id === e.dropData._id);
          let newUsers = [...users];
          newUsers[index] = json;
          setUsers(newUsers);
        }
      });
  };

  useEffect(() => {
    const headers = new Headers();
    const token = window.localStorage.getItem("token");
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    fetch(`http://localhost:5000/api/role/${workspaceId}`, {
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

    fetch(`http://localhost:5000/api/workspace/getUsers/${workspaceId}`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        if (!res.ok) {
          res.text().then((text) => console.log(text));
        } else return res.json();
      })
      .then((json) => {
        if (json) {
          setUsers(json);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [workspaceId]);

  const handleDelete = (roleToDelete) => () => {
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
      <Grid container direction="column" alignItems="center">
        <Grid item xs={6}>
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
              const color = Color(
                randomColor({ format: "rgb", seed: role._id })
              ).desaturate(0.7);
              return (
                <DragDropContainer
                  disappearDraggedElement
                  dragData={role}
                  onDrop={(e) => handleDrop(e)}
                  targetKey="user"
                  key={role._id}
                >
                  <RoleListItem>
                    <Chip
                      label={role.name}
                      onDelete={handleDelete(role)}
                      style={{
                        backgroundColor: color,
                      }}
                    />
                  </RoleListItem>
                </DragDropContainer>
              );
            })}
            <RoleListItem>
              <Chip
                label="Agregar rol"
                color="primary"
                icon={<AddCircleOutlineIcon />}
                onClick={handleClickOpen}
              />
            </RoleListItem>
          </Paper>
        </Grid>
        <Grid item>
          <List
            sx={{
              bgcolor: "background.paper",
              marginTop: "30px",
              width: "100%",
            }}
          >
            {users.map((user) => {
              return (
                <DropTarget key={user._id} dropData={user} targetKey="user">
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        alt={user.firstName + " " + user.lastName}
                        src={`https://res.cloudinary.com/protocolzz/image/upload/${user.profileImageUrl}`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.firstName + " " + user.lastName}
                    />
                    {!user.cardId && (
                      <Chip
                        edge="end"
                        label="Agregar tarjeta"
                        color="primary"
                        icon={<AddCircleOutlineIcon />}
                        sx={{ marginLeft: 2 }}
                        onClick={handleClickAddCardId(user)}
                      />
                    )}
                    {user.role && (
                      <Chip
                        label={user.role.name}
                        style={{
                          marginLeft: 5,
                          backgroundColor: Color(
                            randomColor({
                              format: "rgb",
                              seed: user.role._id,
                            })
                          ).desaturate(0.7),
                        }}
                      />
                    )}
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </DropTarget>
              );
            })}
          </List>
        </Grid>
      </Grid>
      <CreateRole
        open={open}
        handleClose={handleClose}
        devices={props.devices}
        onSubmit={onSubmit}
        loading={loading}
      />
      <AddCardId
        open={openAddCardId}
        handleClose={handleCloseAddCardId}
        user={user}
      />
    </Container>
  );
}
