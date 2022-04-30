import React from "react";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Formik
import { Field } from "formik";

// Formik Mui
import { TextField } from "formik-mui";

const PickYourUserNameStep = ({ onClick }) => {
  return (
    <Container maxWidth="xs" sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontSize: "1.5rem" }}>
            Pick your username
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Coinbase Wallet users can send you payments to this name
          </Typography>

          <Grid
            container
            direction="column"
            justifyContent="space-between"
            sx={{ mt: 4, height: 300 }}
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
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onClick}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PickYourUserNameStep;
