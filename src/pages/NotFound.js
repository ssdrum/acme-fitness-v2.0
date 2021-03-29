import React from "react";
import { Container, Typography } from "@material-ui/core";

const NotFound = () => {
  return (
    <Container>
      <Typography variant="h2">404</Typography>
      <Typography variant="h5">
        The page that you are looking for does not exist
      </Typography>
    </Container>
  );
};

export default NotFound;
