import React from "react";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

// MUI ICONS
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

import { CopyToClipboard } from "react-copy-to-clipboard";

// Formik
import { Field } from "formik";

// Formik Mui
import { TextField } from "formik-mui";

import { useSnackbar } from "notistack";

const BackupYourWalletStep = ({ onClick, formik }) => {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Container maxWidth="xs" sx={{ mt: 3 }}>
      <Card raised sx={{ height: 400, py: 2, px: 2.5 }}>
        <Grid container direction="column" sx={{ height: "100%" }}>
          <Grid item xs={1}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontSize: "1.5rem" }}
            >
              Backup your wallet
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography color="text.secondary">
              Save these 12 words to a password manager, or write down and store
              in a secure place. Do not share with anyone.
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={5}
            justifyContent="center"
            direction="column"
          >
            <Grid item>
              <Field
                component={TextField}
                name="mnemonic"
                label="Username"
                fullWidth
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <CopyToClipboard
                        text={formik.values.mnemonic}
                        onCopy={() => {
                          enqueueSnackbar("Mnemonic copied");
                        }}
                      >
                        <IconButton edge="end">
                          <ContentCopyOutlinedIcon />
                        </IconButton>
                      </CopyToClipboard>
                    </InputAdornment>
                  ),
                }}
                multiline
                rows={3}
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
                Continue
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default BackupYourWalletStep;
