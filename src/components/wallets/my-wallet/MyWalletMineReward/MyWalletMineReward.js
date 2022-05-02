import React from "react";

// MUI COMPONENTS
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const MyWalletMineReward = () => {
  return (
    <Container maxWidth="xs">
      <Card raised sx={{ p: 2, mt: "25vh" }}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h6">Mining Reward : 100</Typography>
          </Grid>
          <Grid item alignSelf="center">
            <Button
              variant="contained"
              sx={{ textTransform: "none", textAlign: "center" }}
            >
              Mine new block
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default MyWalletMineReward;
