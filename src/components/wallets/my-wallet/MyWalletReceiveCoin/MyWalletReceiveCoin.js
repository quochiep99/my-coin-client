import React from "react";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const MyWalletReceiveCoin = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: "25vh" }}>
      <Grid container>
        <TextField label="Your Address" variant="outlined" fullWidth />
      </Grid>
    </Container>
  );
};

export default MyWalletReceiveCoin;
