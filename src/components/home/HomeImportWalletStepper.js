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
import ImportWalletStep from "./ImportWalletStep";
import Card from "@mui/material/Card";

// MNEMONIC
// import { ethers } from "ethers";
import CreatePasswordStep from "./CreatePasswordStep";

const steps = ["Import wallet", "Create password"];

const HomeImportWalletStepperSchema = yup.object().shape({
  mnemonic: yup.string(),
  password: yup.string().required("Please enter the password"),
  verifyPassword: yup.string().required("Please verify your password"),
});

const HomeImportWalletStepper = () => {
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
          {/* <YourWalletIsReadyStep onClick={handleNext} /> */}
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
                console.log(values);
                // const response = await fetch("http://localhost:5000/wallets", {
                //   method: "POST",
                //   headers: {
                //     "Content-Type": "application/json",
                //   },
                //   body: JSON.stringify(values),
                // });

                // // request success
                // if (response.ok) {
                //   handleNext();
                // }
              } catch (err) {
                console.log(err);
              }
            }}
            validationSchema={HomeImportWalletStepperSchema}
            // validateOnBlur={false}
            enableReinitialize
          >
            {(formik) => (
              <Form>
                <Card raised sx={{ height: 500, py: 2, px: 2.5, mx: 2 }}>
                  {activeStep === 0 && (
                    <ImportWalletStep
                      onClick={() => {
                        formik.setFieldTouched("mnemonic");
                        if (
                          formik.touched.mnemonic &&
                          !formik.errors.mnemonic
                        ) {
                          handleNext();
                        }
                      }}
                    />
                  )}
                  {activeStep === 1 && (
                    <CreatePasswordStep
                      onClick={() => {
                        formik.setFieldTouched("password");
                        if (
                          formik.touched.password &&
                          !formik.errors.password &&
                          formik.touched.verifyPassword &&
                          !formik.errors.verifyPassword
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

export default HomeImportWalletStepper;
