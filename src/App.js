import React from "react";

// MUI COMPONENTS
import CssBaseline from "@mui/material/CssBaseline";

// MY COMPONENTS
import Home from "./pages/home/Home";
import MyWallet from "./pages/wallets/my-wallet/MyWallet";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MyWalletBalance from "./components/wallets/my-wallet/MyWalletBalance/MyWalletBalance";
import MyWalletMineReward from "./components/wallets/my-wallet/MyWalletMineReward/MyWalletMineReward";
import MyWalletSendCoin from "./components/wallets/my-wallet/MyWalletSendCoin/MyWalletSendCoin";
import MyWalletReceiveCoin from "./components/wallets/my-wallet/MyWalletReceiveCoin/MyWalletReceiveCoin";
import MyWalletTransactions from "./components/wallets/my-wallet/MyWalletTransactions.js/MyWalletTransactions.js";

// HOOKS
import useWallet from "./hooks/useWallet";

const App = () => {
  const { isInitialized, encryptedWalletJSON } = useWallet();
  console.log(useWallet());
  return isInitialized ? (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route
          path=""
          element={
            !encryptedWalletJSON ? (
              <Home />
            ) : (
              <Navigate to="wallets/my-wallet/balance" />
            )
          }
        />
        <Route
          path="wallets/my-wallet"
          element={encryptedWalletJSON ? <MyWallet /> : <Navigate to="/" />}
        >
          <Route path="balance" element={<MyWalletBalance />} />
          <Route path="mine-reward" element={<MyWalletMineReward />} />
          <Route path="send-coin" element={<MyWalletSendCoin />} />
          <Route path="receive-coin" element={<MyWalletReceiveCoin />} />
          <Route path="transactions" element={<MyWalletTransactions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  ) : (
    "Loading"
  );
};

export default App;
