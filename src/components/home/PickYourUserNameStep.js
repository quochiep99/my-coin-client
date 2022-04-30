import React from "react";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Formik
import { Formik, Form, Field } from "formik";

// Formik Mui
import { TextField } from "formik-mui";

const PickYourUserNameStep = () => {
  return (
    <Container maxWidth="xs" sx={{ mt: 3 }}>
      <Card sx={{ height: 400 }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontSize: "1.5rem" }}>
            Pick your username
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Coinbase Wallet users can send you payments to this name
          </Typography>

          <Formik
            initialValues={{
              username: "",
            }}
          >
            <Form>
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                sx={{ height: 250, mt: 3 }}
              >
                <Grid item>
                  <Field
                    component={TextField}
                    name="username"
                    label="Username"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" fullWidth>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PickYourUserNameStep;
