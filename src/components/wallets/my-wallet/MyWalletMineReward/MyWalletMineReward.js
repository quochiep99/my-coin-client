import React, { useEffect, useState } from "react";

// MUI COMPONENTS
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Utils
import createBlock from "../../../../utils/createBlock";

// HOOKS
import { useSnackbar } from "notistack";

const MyWalletMineReward = () => {
  const [blocks, setBlocks] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickMineNewBlock = async () => {
    const latestBlock = blocks[blocks.length - 1];
    const newBlock = createBlock(latestBlock.index + 1, latestBlock.hash, "");
    const newBlocks = [...blocks, newBlock];
    // append new block to the blocks (blockchain)
    // server side
    try {
      (async () => {
        const response = await fetch("http://localhost:5000/api/blocks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBlock),
        });
        if (response.ok) {
          enqueueSnackbar("Successfully mined a new block with a reward of 100!", {
            variant: "success",
          });
        }
      })();
    } catch (err) {
      console.log(err);
    }

    // client side
    setBlocks(newBlocks);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blocks");
        if (response.ok) {
          const data = await response.json();
          const { blocks } = data;
          console.log(blocks);
          setBlocks(blocks);
        }
      } catch (err) {}
    })();
  }, []);
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
              onClick={handleClickMineNewBlock}
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
