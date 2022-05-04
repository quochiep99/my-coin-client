import React from "react";

// MUI COMPONENTS
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// MUI LAB COMPONENTS
import LoadingButton from "@mui/lab/LoadingButton";

// Formik
import { Formik, Form, Field } from "formik";

// Formik Mui
import { TextField } from "formik-mui";

// HOOKS
import useWallet from "../../../hooks/useWallet";

import bcrypt from "bcryptjs";

const ConfirmPasswordDialog = ({
  open,
  handleClose,
  handleClickMineNewBlock,
}) => {
  const { password, isInitialized } = useWallet();

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Formik
          initialValues={{
            enteredPassword: "",
          }}
          onSubmit={async (values) => {
            try {
              const { enteredPassword } = values;
              await handleClickMineNewBlock(enteredPassword);
              handleClose();
            } catch (err) {
              console.log(err);
            }
          }}
          validate={(values) => {
            let errors = {};
            if (isInitialized) {
              const { enteredPassword } = values;
              console.log(enteredPassword);
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
            }
            return errors;
          }}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {(formik) => {
            return (
              <Form>
                <DialogTitle>Confirm password</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    You need to confirm your password before proceeding to your
                    work
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
                  />
                </DialogContent>
                <DialogActions>
                  {/* <Button type="submit" sx={{ textTransform: "none" }}>
                    Submit
                  </Button> */}
                  <LoadingButton
                    type="submit"
                    loading={formik.isSubmitting}
                    loadingIndicator="Mining..."
                    variant="contained"
                    // fullWidth
                    sx={{ textTransform: "none" }}
                  >
                    Submit
                  </LoadingButton>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </div>
  );
};
export default ConfirmPasswordDialog;
