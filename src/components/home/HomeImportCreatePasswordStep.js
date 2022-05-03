import React from "react";

// MUI COMPONENTS
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Formik
import { Field } from "formik";

// Formik Mui
import { TextField } from "formik-mui";

// MUI LAB COMPONENTS
import LoadingButton from "@mui/lab/LoadingButton";

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = "Please enter password";
  }
  return error;
};

const validateVerifyPassword = (value, originalPassword) => {
  let error;
  if (!value) {
    error = "Please confirm your password";
  } else if (value !== originalPassword) {
    error = "Passwords do not match";
  }
  return error;
};

const HomeImportCreatePasswordStep = ({ formik, handleNext }) => {
  return (
    <Grid container direction="column" sx={{ height: "100%" }}>
      <Grid item xs={1}>
        <Typography variant="h6" component="div" sx={{ fontSize: "1.5rem" }}>
          Create Password
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography color="text.secondary">
          Set a password to unlock your wallet each time you use your computer.
          It can't be used to recover your wallet
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={8}
        justifyContent="center"
        direction="column"
        spacing={2}
      >
        <Grid item>
          <Field
            component={TextField}
            name="password"
            label="Password"
            fullWidth
            type="password"
            validate={validatePassword}
            autoFocus
          />
        </Grid>
        <Grid item>
          <Field
            component={TextField}
            name="verifyPassword"
            label="Verify password"
            fullWidth
            type="password"
            validate={(value) => {
              return validateVerifyPassword(value, formik.values.password);
            }}
          />
        </Grid>
      </Grid>
      <Grid item container direction="column" justifyContent="flex-end" xs={1}>
        <Grid item>
          <LoadingButton
            type="submit"
            loading={formik.isSubmitting}
            loadingIndicator="Encrypting..."
            variant="contained"
            fullWidth
            sx={{ textTransform: "none" }}
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomeImportCreatePasswordStep;
