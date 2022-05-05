import React, { useEffect, useState } from "react";

// MUI COMPONENTS
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

// HOOKS
import useWallet from "../../../../hooks/useWallet";
import { Container } from "@mui/material";

const MyWalletBalance = () => {
  const { utxos } = useWallet();
  console.log(utxos);

  const [balance, setBalance] = useState();

  useEffect(() => {
    let newBalance = 0;
    for (let i = 0; i < utxos.length; i++) {
      newBalance += utxos[i].amount;
    }
    setBalance(newBalance);
  }, [utxos]);

  return (
    <Container maxWidth="xs" sx={{ mt: "25vh" }}>
      <Card raised sx={{ p: 2 }}>
        <Grid direction="column" spacing={2} container>
          <Grid item sx={{ textAlign: "center" }}>
            <Typography variant="subtitle2">Your Balance</Typography>
          </Grid>
          <Grid item sx={{ textAlign: "center" }}>
            {typeof balance === "undefined" ? (
              <CircularProgress />
            ) : (
              <Typography variant="h6" fontSize="3.75rem">
                {balance}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default MyWalletBalance;
