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
import { v4 as uuidv4 } from "uuid";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RegisterWorkspace(props) {
  const { register, handleSubmit, setValue } = useForm()

  var myCropWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "protocolzz",
      uploadPreset: "g3a8fl0y",
      cropping: true,
      public_id: uuidv4(),
    },
    (error, result) => {
      if (error) {
        console.error("There was an error while uploading");
      } else {
        console.log(result);
        if (result.event === "upload-added") {
          console.log(result);
          setValue("pictureUrl", result.info.publicId);
        }
      }
    }
  );

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <DialogTitle>Create a new workspace</DialogTitle>
        <DialogContent>
          <DialogContentText>
            LLena los datos de tu nuevo workspace
          </DialogContentText>
          <TextField
            {...register("name", { required: true })}
            className="login-input"
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="filled"
          />
          <TextField
            {...register("description", { required: true })}
            className="login-input"
            label="Description"
            multiline
            rows={4}
            variant="filled"
          />

          <Button
            variant="contained"
            component="span"
            align="center"
            sx={{ margin: "40px" }}
            onClick={() => myCropWidget.open()}
          >
            Upload Workspace Image
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="sumbit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
