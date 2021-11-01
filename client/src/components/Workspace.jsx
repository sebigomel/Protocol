import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const useStyles = makeStyles({
  customCard: {
    borderRadius: "40px",
    overflow: "hidden",
  },
  customCardActions: {
    justifyContent: "space-between",
    marginRight: '5px',
    marginLeft: '5px',
  },
});

export default function Workspace(props) {
  const classes = useStyles();
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
      <CardActionArea onClick={() => props.handleClick()}>
        <CardMedia>{props.workspaceImage}</CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {props.admin === true
        ? "true"
        : "false" && (
            <CardActions className={classes.customCardActions}>
              <Button size="small" color="inherit">
                Invite
              </Button>
              <Tooltip title="Delete">
                <IconButton onClick={() => props.handleDelete()}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          )}
    </Card>
  );
}
