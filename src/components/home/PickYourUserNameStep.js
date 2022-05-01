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

const PickYourUserNameStep = ({ onClick }) => {
  return (
    <Card raised sx={{ height: 400, py: 2, px: 2.5 }}>
      <Grid container direction="column" sx={{ height: "100%" }}>
        <Grid item xs={1}>
          <Typography variant="h6" component="div" sx={{ fontSize: "1.5rem" }}>
            Pick your username
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography color="text.secondary">
            Coinbase Wallet users can send you payments to this name
          </Typography>
        </Grid>
        <Grid container item xs={6} justifyContent="center" direction="column">
          <Grid item>
            <Field
              component={TextField}
              name="username"
              label="Username"
              fullWidth
              autoFocus
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          justifyContent="flex-end"
          xs={3}
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

export default PickYourUserNameStep;
