import React from "react";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontSize: "1.5rem" }}>
            Backup your wallet
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Save these 12 words to a password manager, or write down and store
            in a secure place. Do not share with anyone.
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
        </CardContent>
      </Card>
    </Container>
  );
};

export default BackupYourWalletStep;
