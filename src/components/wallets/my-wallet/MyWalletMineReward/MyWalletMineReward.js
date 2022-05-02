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
    const transaction = {
      from: "REWARD",
      to: "0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64",
      amount: 100,
      status: "Unspent",
    };
    const data = JSON.stringify(transaction);
    const newBlock = createBlock(latestBlock.index + 1, latestBlock.hash, data);
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
          enqueueSnackbar(
            "Successfully mined a new block with a reward of 100!",
            {
              variant: "success",
            }
          );
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
