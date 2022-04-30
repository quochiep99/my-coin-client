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

const YouSavedItRightStep = ({ formik }) => {
  return (
    <Container maxWidth="xs" sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontSize: "1.5rem" }}>
            You saved it, right ?
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Verify that you saved your seed phrase by enter the correct first
            (1st) and last (12th) word in.
          </Typography>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            sx={{ mt: 4, height: 300 }}
          >
            <Grid container item direction="column" spacing={3}>
              <Grid item>
                <Field
                  component={TextField}
                  name="firstWord"
                  label="First word"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Field
                  component={TextField}
                  name="lastWord"
                  label="Last word"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ textTransform: "none" }}
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

export default YouSavedItRightStep;
