import React from "react";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const MyWalletSendCoin = () => {
  const handleClickSend = () => {
    // Send 10 coins to the provided public address
    // Satoshi sends 10 coins to Annie
    // {
    //   from: "Satoshi",
    //   to: "Annie",
    //   amount: 10,
    // },
    const unconfirmedTransactions = [
      {
        from: "REWARD",
        to: "Satoshi",
        amount: 100,
        status: "spent",
      },
      {
        from: "Satoshi",
        to: "Annie",
        amount: 10,
        status: "unspent",
      },
    ];
  };

  return (
    <Container maxWidth="sm" sx={{ mt: "25vh" }}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            label="Send to address"
            variant="outlined"
            fullWidth
            placeholder="Send to address"
            value="Satoshi"
          />
        </Grid>
        <Grid item alignSelf="center">
          <Button variant="outlined" size="large" onClick={handleClickSend}>
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyWalletSendCoin;
