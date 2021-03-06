import React from "react";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import { Link as RouterLink, Outlet, useNavigate } from "react-router-dom";

// MUI ICONS
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import useWallet from "../../../hooks/useWallet";

const ListItemLink = (props) => {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

const drawerWidth = 205;

const MyWalletDrawer = () => {
  const { signOut } = useWallet();
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button
            color="inherit"
            sx={{ textTransform: "none" }}
            onClick={() => {
              signOut();
              localStorage.clear();
              navigate("/");
            }}
          >
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItemLink
            to="/wallets/my-wallet/balance"
            primary="Balance"
            icon={<PaidOutlinedIcon />}
          />
          <ListItemLink
            to="/wallets/my-wallet/mine-reward"
            primary="Mine Reward"
            icon={<EmojiEventsOutlinedIcon />}
          />
          <ListItemLink
            to="/wallets/my-wallet/send-coin"
            primary="Send coin"
            icon={<IosShareOutlinedIcon />}
          />
          <ListItemLink
            to="/wallets/my-wallet/receive-coin"
            primary="Receive coin"
            icon={<GetAppOutlinedIcon />}
          />
          <ListItemLink
            to="/wallets/my-wallet/transactions"
            primary="Transactions"
            icon={<FeaturedPlayListOutlinedIcon />}
          />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {/* ===================================== */}
        <Outlet />
        {/* ===================================== */}
      </Box>
    </Box>
  );
};

export default MyWalletDrawer;
