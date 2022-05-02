import React from "react";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// MY COMPONENTS
import MyWalletTransactionsBlockCard from "./MyWalletTransactionsBlockCard";

const DUMMY_BLOCKCHAIN = [
  {
    _id: "626f836fa213c89d376c1b89",
    index: 0,
    previousHash: "0",
    timestamp: 1651474851,
    data: "Welcome to coinbase wallet",
    nonce: 780,
    hash: "000ef091366758caa1efda12fba3baae62ddf6d6e388b2fa8c9f1dacdb8c9398",
  },
  {
    _id: "626fb001f914a222ba8c6215",
    index: 1,
    previousHash:
      "000ef091366758caa1efda12fba3baae62ddf6d6e388b2fa8c9f1dacdb8c9398",
    timestamp: 1651486721,
    data: "",
    nonce: 2719,
    hash: "000dfe828f193f1d130713f133ac49ef006c13c4e76aff64c28943b5ba1a4026",
  },
];

const MyWalletTransactions = () => {
  return (
    <Container maxWidth="md">
      <Grid container direction="column" sx={{ width: "100%" }} spacing={4}>
        <Grid item>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Blockchain Transactions
          </Typography>
        </Grid>
        <Grid item container direction="column" spacing={4}>
          {DUMMY_BLOCKCHAIN.map((el, index) => {
            return (
              <Grid item key={el._id}>
                <MyWalletTransactionsBlockCard {...el} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyWalletTransactions;
