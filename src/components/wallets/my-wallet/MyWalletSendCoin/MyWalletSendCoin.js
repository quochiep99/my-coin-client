import React, { useState } from "react";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// Formik
import { Formik, Form, Field } from "formik";

// Formik Mui
import { TextField } from "formik-mui";

import { ethers } from "ethers";
import ConfirmPasswordDialog from "../ConfirmPasswordDialog";

import bcrypt from "bcryptjs";

// HOOKS
import useWallet from "../../../../hooks/useWallet";
import { useSnackbar } from "notistack";

// Utils
import getUnconfirmedTransactions from "../../../../utils/getUnconfirmedTransactions";
import API_HOST_NAME from "../../../../config";

const MyWalletSendCoin = () => {
  const { password, encryptedWalletJSON, address, utxos } = useWallet();
  const { enqueueSnackbar } = useSnackbar();

  let funds;

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
    <Container maxWidth="sm" sx={{ mt: "25vh" }}>
      <Formik
        initialValues={{
          to: "",
          amount: "",
          enteredPassword: "",
        }}
        validate={(values) => {
          funds = {
            utxos: [],
            total: 0,
          };
          console.log(values);
          let errors = {};
          const { to, amount } = values;
          if (!to) {
            errors.to = "Please enter the address to send to";
          } else if (!ethers.utils.isAddress(to)) {
            errors.to = "Invalid address format";
          }
          if (!amount) {
            errors.amount = "Please specify the amount to be sent";
          } else if (amount <= 0) {
            errors.amount = "Amount must be greater than 0";
          }

          for (let i = 0; i < utxos.length; i++) {
            funds.utxos.push(utxos[i]);
            funds.total += utxos[i].amount;
            // check if the accumulated funds's total amount is enough for the successful transaction
            if (funds.total >= amount) {
              break;
            }
          }
          if (funds.total < amount) {
            errors.amount =
              "You do not have enough balance for this transaction";
          }

          return errors;
        }}
        onSubmit={async (values) => {
          try {
            const { to, amount, enteredPassword } = values;
            const passwordIsMatched = bcrypt.compareSync(
              enteredPassword,
              password
            );
            if (!passwordIsMatched) {
              enqueueSnackbar("Incorrect password", { variant: "error" });
              throw new Error("Incorrect password");
            }
            const decryptedWallet = await ethers.Wallet.fromEncryptedJson(
              encryptedWalletJSON,
              enteredPassword
            );

            const unconfirmedTransactions = getUnconfirmedTransactions(
              funds,
              {
                from: address,
                to: to,
                amount: amount,
              },
              decryptedWallet.privateKey
            );
            const response = await fetch(
              `${API_HOST_NAME}/api/unconfirmedTransactions/mine`,
              {
                method: "POST",
                body: JSON.stringify(unconfirmedTransactions),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              handleClose();
            }
          } catch (err) {
            console.log(err);
          }
        }}
        validateOnBlur={false}
      >
        {(formik) => {
          return (
            <Form>
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <ConfirmPasswordDialog
                    open={open}
                    handleClose={handleClose}
                    formik={formik}
                    loadingIndicator="Sending..."
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    label="Send to address"
                    variant="outlined"
                    fullWidth
                    placeholder="Send to address"
                    name="to"
                    autoFocus
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    label="Amount"
                    variant="outlined"
                    fullWidth
                    placeholder="0"
                    name="amount"
                    type="number"
                  />
                </Grid>
                <Grid item alignSelf="center">
                  <Button
                    variant="outlined"
                    size="large"
                    // type="submit"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        formik.touched.to &&
                        !formik.errors.to &&
                        formik.touched.amount &&
                        !formik.errors.amount &&
                        formik.dirty
                      ) {
                        // formik.resetForm();
                        handleClickOpen();
                      } else {
                        formik.setFieldTouched("amount", true);
                        formik.validateForm();
                      }
                    }}
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default MyWalletSendCoin;
