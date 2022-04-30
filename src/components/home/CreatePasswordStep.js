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

const CreatePasswordStep = ({ onClick }) => {
  return (
    <Card raised sx={{ height: 400, py: 2, px: 2.5 }}>
      <Grid container direction="column" sx={{ height: "100%" }}>
        <Grid item xs={1}>
          <Typography variant="h6" component="div" sx={{ fontSize: "1.5rem" }}>
            Create Password
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography color="text.secondary">
            Set a password to unlock your wallet each time you use your
            computer. It can't be used to recover your wallet
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
              name="password"
              label="Password"
              fullWidth
              type="password"
            />
          </Grid>
          <Grid item>
            <Field
              component={TextField}
              name="verifyPassword"
              label="Verify password"
              fullWidth
              type="password"
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          justifyContent="flex-end"
          xs={1}
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ textTransform: "none" }}
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CreatePasswordStep;
