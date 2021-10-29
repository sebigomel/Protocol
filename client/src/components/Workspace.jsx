import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  customCard: {
    borderRadius: "30%",
    overflow: "hidden"
  },
});

export default function Workspace(props) {
  const classes = useStyles();
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 12 }} >
      <CardActionArea>
        <CardMedia>
            {props.workspaceImage}
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {props.admin && (
        <CardActions>
          <Button size="small" color="inherit">
            Invite
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
