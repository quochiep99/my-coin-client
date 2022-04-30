import React from "react";

// HOOKS
import { useState } from "react";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
  "Your wallet is ready",
];

const HomeCreateNewWalletStepper = () => {
  const [activeStep, setActiveStep] = useState(3);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
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
                {activeStep === 4 && (
                  <YourWalletIsReadyStep onClick={handleNext} />
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
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default HomeCreateNewWalletStepper;
