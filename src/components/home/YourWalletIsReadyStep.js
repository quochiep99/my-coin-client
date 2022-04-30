import React from "react";

// MUI COMPONENTS
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const YourWalletIsReadyStep = ({ formik }) => {
  return (
    <Box sx={{ height: 400 }}>
      <Card sx={{ height: "100%" }} raised>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontSize: "1.5rem" }}>
            Your wallet is ready
          </Typography>
          <Typography sx={{ mb: 1.5, mt: 2 }} color="text.secondary">
            Be sure to pin the extension in your browser to access it easily
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default YourWalletIsReadyStep;
