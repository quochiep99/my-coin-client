import React from "react";

// MUI COMPONENTS
import CssBaseline from "@mui/material/CssBaseline";

// MY COMPONENTS
import Home from "./pages/home/Home";
import MyWallet from "./pages/wallets/my-wallet/MyWallet";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyWalletBalance from "./components/wallets/my-wallet/MyWalletBalance/MyWalletBalance";
import MyWalletMineReward from "./components/wallets/my-wallet/MyWalletMineReward/MyWalletMineReward";
import MyWalletSendCoin from "./components/wallets/my-wallet/MyWalletSendCoin/MyWalletSendCoin";
import MyWalletReceiveCoin from "./components/wallets/my-wallet/MyWalletReceiveCoin/MyWalletReceiveCoin";
import MyWalletTransactions from "./components/wallets/my-wallet/MyWalletTransactions.js/MyWalletTransactions.js";

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="wallets" element={<MyWallet />}>
          <Route path="my-wallet/balance" element={<MyWalletBalance />} />
          <Route
            path="my-wallet/mine-reward"
            element={<MyWalletMineReward />}
          />
          <Route path="my-wallet/send-coin" element={<MyWalletSendCoin />} />
          <Route
            path="my-wallet/receive-coin"
            element={<MyWalletReceiveCoin />}
          />
          <Route
            path="my-wallet/transactions"
            element={<MyWalletTransactions />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
