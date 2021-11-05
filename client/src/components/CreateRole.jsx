import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { useParams } from "react-router-dom";
import Slide from "@mui/material/Slide";
import { useForm } from "react-hook-form";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormDialog(props) {
  const { workspaceId } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [checked, setChecked] = useState([]);
  const [devices, setDevices] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    setChecked([]);
    reset({ name: "" });
  }, [props.open]);

  useEffect(() => {
    setValue("devices", checked);
  }, [checked]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/device/${workspaceId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) return;
        else return res.json();
      })
      .then((json) => {
        if (json) {
          setDevices(json);
        }
      });
  }, [workspaceId]);

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>Crear un nuevo rol</DialogTitle>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <DialogContent align="center">
          <DialogContentText>
            Selecciona las puertas que le quieras asignar a este rol
          </DialogContentText>
          <TextField
            {...register("name", { required: true })}
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            type="text"
            variant="filled"
          />
          <List
            dense
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {devices.map((device) => {
              const labelId = `checkbox-list-secondary-label-${device.name}`;
              return (
                <>
                  <ListItem
                    key={device._id}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(device._id)}
                        checked={checked.indexOf(device._id) !== -1}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    }
                    disablePadding
                  >
                    <ListItemText
                      inset={true}
                      id={labelId}
                      primary={device.name}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="sumbit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
