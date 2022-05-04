import React, { useState } from "react";

// MUI COMPONENTS
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Utils
import createBlock from "../../../../utils/createBlock";
import signTransaction from "../../../../utils/signTransaction";

// HOOKS
import { useSnackbar } from "notistack";
import useWallet from "../../../../hooks/useWallet";
import useBlocks from "../../../../hooks/useBlocks";

// MY COMPONENTS
import ConfirmPasswordDialog from "../ConfirmPasswordDialog";

import { ethers } from "ethers";

const MyWalletMineReward = () => {
  const { blocks, addBlock } = useBlocks();
  const { encryptedWalletJSON } = useWallet();
  const { enqueueSnackbar } = useSnackbar();

  // ConfirmPasswordDialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // =============================

  const handleClickMineNewBlock = async (password) => {
    try {
      const decryptedWallet = await ethers.Wallet.fromEncryptedJson(
        encryptedWalletJSON,
        password
      );
      const latestBlock = blocks[blocks.length - 1];
      const transactionData = {
        from: "REWARD",
        to: decryptedWallet.address,
        amount: 100,
        status: "unspent",
      };

      const transactionSignature = signTransaction(
        transactionData,
        decryptedWallet.privateKey
      );
      const transactions = [
        {
          data: transactionData,
          signature: transactionSignature,
        },
      ];
      const data = JSON.stringify(transactions);
      const newBlock = createBlock(
        latestBlock.index + 1,
        latestBlock.hash,
        data
      );
      // append new block to the blocks (blockchain)
      // server side

      // Broadcast new block to all the connected nodes
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

      // client side
      addBlock(newBlock);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <ConfirmPasswordDialog
        open={open}
        handleClose={handleClose}
        handleClickMineNewBlock={handleClickMineNewBlock}
      />
      <Card raised sx={{ p: 2, mt: "25vh" }}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h6">Mining Reward : 100</Typography>
          </Grid>
          <Grid item alignSelf="center">
            <Button
              variant="contained"
              sx={{ textTransform: "none", textAlign: "center" }}
              onClick={() => {
                handleClickOpen();
              }}
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
