import React from "react";

// HOOKS
import { useState } from "react";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

// Formik
import { Formik, Form } from "formik";

// MY COMPONENTS
import ImportWalletStep from "./ImportWalletStep";
import HomeImportCreatePasswordStep from "./HomeImportCreatePasswordStep";
import YourWalletIsReadyStep from "./YourWalletIsReadyStep";

import Card from "@mui/material/Card";

// MNEMONIC
import { ethers } from "ethers";

// HOOKS
import useWallet from "../../hooks/useWallet";
import { useSnackbar } from "notistack";

const steps = ["Import wallet", "Create password"];

// const HomeImportWalletStepperSchema = yup.object().shape({
//   mnemonic: yup.string(),
//   password: yup.string().required("Please enter the password"),
//   verifyPassword: yup.string().required("Please verify your password"),
// });

const HomeImportWalletStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { address, setAddress } = useWallet();
  const { enqueueSnackbar } = useSnackbar();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <Container maxWidth="xs" sx={{ mt: 3 }}>
          <YourWalletIsReadyStep onClick={handleNext} />
        </Container>
      ) : (
        <Container maxWidth="xs" sx={{ mt: 5 }}>
          <Formik
            initialValues={{
              mnemonic: "",
              password: "",
              verifyPassword: "",
            }}
            onSubmit={async (values) => {
              try {
                const { mnemonic, password, verifyPassword } = values;
                if (
                  !mnemonic ||
                  !password ||
                  !verifyPassword ||
                  password !== verifyPassword
                ) {
                  throw new Error("Invalid inputs");
                }
                // check if the entered mnemonic is valid
                const walletFromMnemonic = ethers.Wallet.fromMnemonic(mnemonic);
                // encrypt the wallet using the user's password
                const encryptedWallet = await walletFromMnemonic.encrypt(
                  password
                );
                console.log(encryptedWallet);
                handleNext();
              } catch (err) {
                enqueueSnackbar(err.message, {
                  variant: "error",
                });
                console.log(err);
              }
            }}
            // validationSchema={HomeImportWalletStepperSchema}
            enableReinitialize
            validateOnChange={false}
            validateOnBlur={false}
            initialTouched={{
              // mnemonic: true,
              password: true,
              verifyPassword: true,
            }}
          >
            {(formik) => (
              <Form>
                <Card raised sx={{ height: 500, py: 2, px: 2.5, mx: 2 }}>
                  {activeStep === 0 && (
                    <ImportWalletStep formik={formik} handleNext={handleNext} />
                  )}
                  {activeStep === 1 && (
                    <HomeImportCreatePasswordStep
                      formik={formik}
                      handleNext={handleNext}
                    />
                  )}
                </Card>
              </Form>
            )}
          </Formik>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>

            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </Container>
      )}
    </>
  );
};

export default HomeImportWalletStepper;
