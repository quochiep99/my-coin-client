import React from "react";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const YourWalletIsReadyStep = ({ formik }) => {
  return (
    <Container maxWidth="xs" sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontSize: "1.5rem" }}>
            Your wallet is ready
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Be sure to pin the extension in your browser to access it easily
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default YourWalletIsReadyStep;
