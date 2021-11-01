import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export default function Devices(props) {
  return (
    <Box sx={{ margin: "auto" }}>
      <Typography variant="h4" sx={{ fontFamily: "Montserrat" }}>
        Agrega mas dispositivos utilizando el codigo QR de la caja
      </Typography>
      <List
        sx={{
          margin: "auto",
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {props.devices.map((device) => (
          <ListItem key={device._id}>
            <ListItemText primary={device.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
