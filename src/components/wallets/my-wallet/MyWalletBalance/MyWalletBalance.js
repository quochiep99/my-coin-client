import React, { useEffect, useState } from "react";

// MUI COMPONENTS
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

// MUI ICONS
import RefreshIcon from "@mui/icons-material/Refresh";

// HOOKS
import useWallet from "../../../../hooks/useWallet";
import useBlocks from "../../../../hooks/useBlocks";

const MyWalletBalance = () => {
  const { utxos } = useWallet();
  const { fetchBlocks } = useBlocks();

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
          <Grid item sx={{ textAlign: "center", mt: 1 }}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={() => {
                fetchBlocks();
              }}
            >
              Refresh
            </Button>
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
