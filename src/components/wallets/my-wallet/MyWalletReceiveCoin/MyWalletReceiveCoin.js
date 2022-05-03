import React from "react";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

// HOOKS
import useWallet from "../../../../hooks/useWallet";

const MyWalletReceiveCoin = () => {
  const { address } = useWallet();

  return (
    <Container maxWidth="sm" sx={{ mt: "25vh" }}>
      <Grid container>
        <TextField
          label="Your Address"
          variant="outlined"
          fullWidth
          value={address}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
    </Container>
  );
};

export default MyWalletReceiveCoin;
