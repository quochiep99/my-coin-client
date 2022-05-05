import React, { useState } from "react";

// MUI COMPONENTS
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Utils
import mineBlock from "../../../../utils/mineBlock";
import signTransactionData from "../../../../utils/signTransactionData";

// HOOKS
import { useSnackbar } from "notistack";
import useWallet from "../../../../hooks/useWallet";
import useBlocks from "../../../../hooks/useBlocks";

// MY COMPONENTS
import ConfirmPasswordDialog from "../ConfirmPasswordDialog";

import { ethers } from "ethers";

import { Form, Formik } from "formik";

import bcrypt from "bcryptjs";

const MyWalletMineReward = () => {
  const { blocks, createBlock } = useBlocks();
  const { encryptedWalletJSON } = useWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { password } = useWallet();

  // ConfirmPasswordDialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // =============================

  return (
    <Container maxWidth="xs">
      <Card raised sx={{ p: 2, mt: "25vh" }}>
        <Formik
          initialValues={{
            enteredPassword: "",
          }}
          onSubmit={async (values) => {
            try {
              const { enteredPassword } = values;
              const decryptedWallet = await ethers.Wallet.fromEncryptedJson(
                encryptedWalletJSON,
                enteredPassword
              );
              const latestBlock = blocks[blocks.length - 1];
              const transactionData = {
                from: "REWARD",
                to: decryptedWallet.address,
                amount: 100,
                status: "unspent",
                timestamp: Math.floor(Date.now() / 1000),
              };
              // hash the transactionData, not including status since this field is changeable from 'unspent' to 'spent'
              transactionData.hash = ethers.utils.id(
                JSON.stringify({
                  ...transactionData,
                  status: undefined,
                })
              );

              const transactionSignature = signTransactionData(
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
              const newBlock = mineBlock(
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
              createBlock(newBlock);
              // close dialog
              handleClose();
            } catch (err) {
              console.log(err);
            }
          }}
          validate={(values) => {
            let errors = {};
            const { enteredPassword } = values;
            if (!enteredPassword) {
              errors = {
                enteredPassword: "Please enter your password",
              };
            } else {
              const passwordIsMatched = bcrypt.compareSync(
                enteredPassword,
                password
              );
              if (!passwordIsMatched) {
                errors = {
                  enteredPassword: "Incorrect password",
                };
              }
            }

            return errors;
          }}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {(formik) => {
            return (
              <Form>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <ConfirmPasswordDialog
                      open={open}
                      handleClose={handleClose}
                      formik={formik}
                      loadingIndicator="Mining..."
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">Mining Reward : 100</Typography>
                  </Grid>
                  <Grid item alignSelf="center">
                    <Button
                      variant="contained"
                      sx={{ textTransform: "none", textAlign: "center" }}
                      onClick={() => {
                        formik.resetForm();
                        handleClickOpen();
                      }}
                    >
                      Mine new block
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </Container>
  );
};

export default MyWalletMineReward;
