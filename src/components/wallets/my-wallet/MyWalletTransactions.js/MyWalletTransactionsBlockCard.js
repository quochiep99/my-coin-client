import React from "react";

// MUI COMPONENTS
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const MyWalletTransactionsBlockCard = ({
  index,
  previousHash,
  timestamp,
  data,
  nonce,
  hash,
}) => {
  return (
    <Card raised sx={{ px: 4, py: 5 }}>
      <Grid item container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h5" fontWeight="bold">
            Block #{index}
          </Typography>
        </Grid>

        <Divider sx={{ mt: 1 }} />

        <Grid item container>
          <Grid item alignSelf="center" xs={2}>
            <Typography variant="subtitle2">Previous hash</Typography>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              sx={{ ml: 1 }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={previousHash}
            />
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item alignSelf="center" xs={2}>
            <Typography variant="subtitle2">Timestamp</Typography>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              sx={{ ml: 1 }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={new Date(timestamp * 1000).toUTCString()}
            />
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item alignSelf="center" xs={2}>
            <Typography variant="subtitle2">Data</Typography>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              sx={{ ml: 1 }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={data}
            />
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item alignSelf="center" xs={2}>
            <Typography variant="subtitle2">Nonce</Typography>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              sx={{ ml: 1 }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={nonce}
            />
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item alignSelf="center" xs={2}>
            <Typography variant="subtitle2">Hash</Typography>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              sx={{ ml: 1 }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={hash}
            />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MyWalletTransactionsBlockCard;
