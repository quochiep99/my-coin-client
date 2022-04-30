import React from "react";

// MUI COMPONENTS
import CssBaseline from "@mui/material/CssBaseline";

// MY COMPONENTS
import Home from "./pages/home/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
