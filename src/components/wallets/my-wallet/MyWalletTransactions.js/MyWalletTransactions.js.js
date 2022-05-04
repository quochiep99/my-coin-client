import React from "react";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// MY COMPONENTS
import MyWalletTransactionsBlockCard from "./MyWalletTransactionsBlockCard";

// HOOKS
import useBlocks from "../../../../hooks/useBlocks";

// const DUMMY_BLOCKCHAIN = [
//   {
//     _id: "626f836fa213c89d376c1b89",
//     index: 0,
//     previousHash: "0",
//     timestamp: 1651474851,
//     data: "Welcome to coinbase wallet",
//     nonce: 780,
//     hash: "000ef091366758caa1efda12fba3baae62ddf6d6e388b2fa8c9f1dacdb8c9398",
//   },
//   {
//     _id: "626fb001f914a222ba8c6215",
//     index: 1,
//     previousHash:
//       "000ef091366758caa1efda12fba3baae62ddf6d6e388b2fa8c9f1dacdb8c9398",
//     timestamp: 1651486721,
//     data: [
//       {
//         from: "REWARD",
//         to: "your address",
//         amount: 100,
//         status: "unspent",
//       },
//     ],
//     nonce: 2719,
//     hash: "000dfe828f193f1d130713f133ac49ef006c13c4e76aff64c28943b5ba1a4026",
//   },
// ];

const MyWalletTransactions = () => {
  const { blocks } = useBlocks();
  return (
    <Container maxWidth="md">
      <Grid
        container
        direction="column"
        sx={{ width: "100%", m: 0 }}
        spacing={4}
      >
        <Grid item>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Blockchain Transactions
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="column"
          spacing={4}
          sx={{ width: "100%" }}
        >
          {blocks.map((el) => {
            try {
              el.data = JSON.parse(el.data);
            } catch (err) {}

            return (
              <Grid item key={el._id} sx={{ width: "100%" }}>
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
