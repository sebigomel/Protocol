import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import Slide from "@mui/material/Slide";

export default function RegisterWorkspace(props) {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>Create a new workspace</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in your's legendary workspace data
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="filled"
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
