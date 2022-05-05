import React from "react";

// MUI COMPONENTS
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

// MUI LAB COMPONENTS
import LoadingButton from "@mui/lab/LoadingButton";

// Formik
import { Field } from "formik";

// Formik Mui
import { TextField } from "formik-mui";

import useWallet from "../../../hooks/useWallet";

const validatePassword = (value, password) => {
  let error;
  if (!value) {
    error = "Please enter your password";
  }
  return error;
};

const ConfirmPasswordDialog = ({
  open,
  handleClose,
  formik,
  loadingIndicator,
}) => {
  const { password } = useWallet();
  return (
    <Dialog open={open}>
      <DialogTitle>Confirm password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You need to confirm your password before proceeding to your work
        </DialogContentText>
        <Field
          component={TextField}
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          name="enteredPassword"
          size="small"
          sx={{ mt: 3 }}
          autoFocus
          validate={(value) => {
            return validatePassword(value, password);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          onClick={() => {
            handleClose();
            formik.resetForm();
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          loading={formik.isSubmitting}
          loadingIndicator={loadingIndicator}
          variant="contained"
          // type="submit"
          sx={{ textTransform: "none" }}
          onClick={() => {
            formik.submitForm();
          }}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmPasswordDialog;
