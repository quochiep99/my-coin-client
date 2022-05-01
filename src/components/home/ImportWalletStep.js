import React from "react";

// MUI COMPONENTS
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Formik
import { Field } from "formik";

// Formik Mui
import { TextField } from "formik-mui";

const ImportWalletStep = ({ onClick }) => {
  return (
    <Grid container direction="column" sx={{ height: "100%" }}>
      <Grid item xs={1}>
        <Typography variant="h6" component="div" sx={{ fontSize: "1.5rem" }}>
          Import wallet
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography color="text.secondary">
          Enter your wallet's 12 word recovery phrase (also called a seed
          phrase). You can import any Ethereum or Solana wallet.
        </Typography>
      </Grid>
      <Grid container item xs={8} justifyContent="center" direction="column">
        <Grid item>
          <Field
            component={TextField}
            name="mnemonic"
            label="Mnemonic phrase"
            fullWidth
            autoFocus
            placeholder="12 word seed phrase"
          />
        </Grid>
      </Grid>
      <Grid item container direction="column" justifyContent="flex-end" xs={1}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onClick}
            sx={{ textTransform: "none" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ImportWalletStep;
