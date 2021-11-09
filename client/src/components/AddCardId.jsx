import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCardId(props) {
  const user = props.user;
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Asignar tarjeta a ${user.firstName + " " + user.lastName}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Pasa la tarjeta por cualquiera de las puertas de tu workspace y
          automaticamente se le asignara a{" "}
          {user.firstName + " " + user.lastName}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancelar</Button>
        <Button onClick={props.handleClose} autoFocus>
          Listo
        </Button>
      </DialogActions>
    </Dialog>
  );
}
