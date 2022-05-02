import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { SnackbarProvider } from "notistack";

// Roboto font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// CONTEXTS
import { UnconfirmedTransactionsContextProvider } from "./contexts/UnconfirmedTransactionsContext";
import { BlocksContextProvider } from "./contexts/BlocksContext";
import { WalletContextProvider } from "./contexts/WalletContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={1}>
      <UnconfirmedTransactionsContextProvider>
        <BlocksContextProvider>
          <WalletContextProvider>
            <App />
          </WalletContextProvider>
        </BlocksContextProvider>
      </UnconfirmedTransactionsContextProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
