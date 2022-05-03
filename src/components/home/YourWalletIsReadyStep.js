import React from "react";

// MUI COMPONENTS
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button sx={{ textTransform: "none" }} variant="contained">
              Access wallet now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default YourWalletIsReadyStep;
