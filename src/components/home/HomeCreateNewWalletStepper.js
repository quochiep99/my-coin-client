import React, { useEffect } from "react";

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

// Yup
import * as yup from "yup";

// MY COMPONENTS
import PickYourUserNameStep from "./PickYourUserNameStep";
import BackupYourWalletStep from "./BackupYourWalletStep";
import YouSavedItRightStep from "./YouSavedItRightStep";
import CreatePasswordStep from "./CreatePasswordStep";
import YourWalletIsReadyStep from "./YourWalletIsReadyStep";
import Card from "@mui/material/Card";

// MNEMONIC
import { ethers } from "ethers";

const steps = [
  "Pick your username",
  "Backup your wallet",
  "You saved it, right ?",
  "Create password",
];

const HomeCreateNewWalletStepperSchema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  mnemonic: yup.string(),
  firstWord: yup.string().required("Please enter the first word"),
  lastWord: yup.string().required("Please enter the last word"),
  password: yup.string().required("Please enter the password"),
  verifyPassword: yup.string().required("Please verify your password"),
});

const HomeCreateNewWalletStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [mnemonic, setMnemonic] = useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    const mnemonic = ethers.Wallet.createRandom()._mnemonic().phrase;
    setMnemonic(mnemonic);
  }, []);

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
              username: "",
              mnemonic: mnemonic,
              firstWord: "",
              lastWord: "",
              password: "",
              verifyPassword: "",
            }}
            onSubmit={async (values) => {
              try {
                console.log(values);
                const response = await fetch("http://localhost:5000/wallets", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                });

                // request success
                if (response.ok) {
                  handleNext();
                }
              } catch (err) {
                console.log(err);
              }
            }}
            validationSchema={HomeCreateNewWalletStepperSchema}
            // validateOnBlur={false}
            enableReinitialize
          >
            {(formik) => (
              <Form>
                <Card raised sx={{ height: 500, py: 2, px: 2.5, mx: 2 }}>
                  {activeStep === 0 && (
                    <PickYourUserNameStep
                      onClick={() => {
                        formik.setFieldTouched("username");
                        if (
                          formik.touched.username &&
                          !formik.errors.username
                        ) {
                          handleNext();
                        }
                      }}
                    />
                  )}
                  {activeStep === 1 && (
                    <BackupYourWalletStep
                      onClick={handleNext}
                      formik={formik}
                    />
                  )}
                  {activeStep === 2 && (
                    <YouSavedItRightStep
                      onClick={() => {
                        formik.setFieldTouched("lastWord");
                        if (
                          formik.touched.firstWord &&
                          !formik.errors.firstWord &&
                          formik.touched.lastWord &&
                          !formik.errors.lastWord
                        ) {
                          handleNext();
                        }
                      }}
                    />
                  )}
                  {activeStep === 3 && (
                    <CreatePasswordStep
                      onClick={() => {
                        formik.setFieldTouched("lastWord");
                        if (
                          formik.touched.password &&
                          !formik.errors.password
                        ) {
                          handleNext();
                        }
                      }}
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

export default HomeCreateNewWalletStepper;
