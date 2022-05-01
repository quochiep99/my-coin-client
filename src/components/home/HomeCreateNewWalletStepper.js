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

// Yup
import * as yup from "yup";

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
            validationSchema={HomeCreateNewWalletStepperSchema}
            validateOnBlur={false}
          >
            {(formik) => (
              <Form>
                {activeStep === 0 && (
                  <PickYourUserNameStep
                    onClick={() => {
                      if (formik.touched.username && !formik.errors.username) {
                        handleNext();
                      }
                    }}
                  />
                )}
                {activeStep === 1 && (
                  <BackupYourWalletStep onClick={handleNext} formik={formik} />
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
                      if (formik.touched.password && !formik.errors.password) {
                        handleNext();
                      }
                    }}
                  />
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
