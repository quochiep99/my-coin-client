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
import PickYourUserNameStep from "./PickYourUserNameStep";
import BackupYourWalletStep from "./BackupYourWalletStep";
import YouSavedItRightStep from "./YouSavedItRightStep";
import CreatePasswordStep from "./CreatePasswordStep";
import YourWalletIsReadyStep from "./YourWalletIsReadyStep";

const steps = [
  "Pick your username",
  "Backup your wallet",
  "You saved it, right ?",
  "Create password",
];

const HomeCreateNewWalletStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

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
              username: "",
              mnemonic:
                "harvest fluid gesture dismiss alone park village burst achieve ring oil neutral",
              firstWord: "",
              lastWord: "",
              password: "",
              verifyPassword: "",
            }}
            onSubmit={(values) => {
              console.log(values);
              handleNext();
            }}
          >
            {(formik) => (
              <Form>
                {activeStep === 0 && (
                  <PickYourUserNameStep onClick={handleNext} />
                )}
                {activeStep === 1 && (
                  <BackupYourWalletStep onClick={handleNext} formik={formik} />
                )}
                {activeStep === 2 && (
                  <YouSavedItRightStep onClick={handleNext} />
                )}
                {activeStep === 3 && (
                  <CreatePasswordStep onClick={handleNext} />
                )}
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
