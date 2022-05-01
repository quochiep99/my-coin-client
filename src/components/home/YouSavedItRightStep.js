import React from "react";

// MUI COMPONENTS
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Formik
import { Field } from "formik";

// Formik Mui
import { TextField } from "formik-mui";

const YouSavedItRightStep = ({ onClick }) => {
  return (
    <Card raised sx={{ height: 400, py: 2, px: 2.5 }}>
      <Grid container direction="column" sx={{ height: "100%" }}>
        <Grid item xs={1}>
          <Typography variant="h6" component="div" sx={{ fontSize: "1.5rem" }}>
            You saved it, right ?
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography color="text.secondary">
            Verify that you saved your seed phrase by enter the correct first
            (1st) and last (12th) word in.
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={7}
          justifyContent="center"
          direction="column"
          spacing={2}
        >
          <Grid item>
            <Field
              component={TextField}
              name="firstWord"
              label="First word"
              fullWidth
              autoFocus
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
        <Grid
          item
          container
          direction="column"
          justifyContent="flex-end"
          xs={2}
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={onClick}
              sx={{ textTransform: "none" }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default YouSavedItRightStep;
