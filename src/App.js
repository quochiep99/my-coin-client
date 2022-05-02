import React from "react";

// MUI COMPONENTS
import CssBaseline from "@mui/material/CssBaseline";

// MY COMPONENTS
import Home from "./pages/home/Home";
import MyWallet from "./pages/wallets/my-wallet/MyWallet";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wallets/my-wallet" element={<MyWallet />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
