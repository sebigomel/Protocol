import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/system";

export default function Devices(props) {
  return (
    <Box sx={{ margin: "auto" }}>
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
