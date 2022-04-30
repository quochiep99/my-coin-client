import React from "react";

// MUI COMPONENTS
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// MUI ICONS
import AddIcon from "@mui/icons-material/Add";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

const HomeCoinbaseWalletCard = ({ onClick }) => {
  return (
    <Card sx={{ width: 360 }}>
      <CardContent sx={{ height: 300 }}>
        <AccountBalanceWalletOutlinedIcon />
        <Typography variant="h6" component="div" sx={{ fontSize: "1.5rem" }}>
          Coinbase Wallet
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          To get started, create a new wallet or use one you already have
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2.5 }}>
        <Box sx={{ width: "100%" }}>
          <Stack>
            <Button
              variant="contained"
              fullWidth
              sx={{ mb: 2, textTransform: "none ", pt: 1.5 }}
              onClick={onClick}
            >
              <Grid container justifyContent="space-between">
                <Grid item>Create new wallet</Grid>
                <Grid item>
                  <AddIcon />
                </Grid>
              </Grid>
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mb: 2, textTransform: "none ", pt: 1.5 }}
            >
              <Grid container justifyContent="space-between">
                <Grid item>Import an existing wallet</Grid>
                <Grid item>
                  <FileDownloadOutlinedIcon />
                </Grid>
              </Grid>
            </Button>
          </Stack>
        </Box>
      </CardActions>
    </Card>
  );
};

export default HomeCoinbaseWalletCard;
