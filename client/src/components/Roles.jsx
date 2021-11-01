import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function Roles(props) {
  const [roles, setRoles] = React.useState(props.roles);

  const handleDelete = (roleToDelete) => () => {
    setRoles((roles) => roles.filter((role) => role.key !== roleToDelete.key));
  };

  return (
    <Container>
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
                <ListItem key={role._id}>
                  <Chip label={role.name} onDelete={handleDelete(role)} />
                </ListItem>
              );
            })}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
