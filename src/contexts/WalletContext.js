import React, { useState } from "react";

const WalletContext = React.createContext({
  address: "",
  username: "",
  utxos: [], // unspent transaction outputs
  setAddress: (address) => {},
  setUsername: (username) => {},
  setUTXOS: (utxos) => {},
});

const WalletContextProvider = ({ children }) => {
  let localStorageWallet = localStorage.getItem("wallet");
  let parsedLocalStorageWallet;
  try {
    parsedLocalStorageWallet = JSON.parse(localStorageWallet);
  } catch (err) {
    localStorage.removeItem("wallet");
    parsedLocalStorageWallet = {
      address: "",
      username: "",
      utxos: [], // unspent transaction outputs
    };
  }

  const [state, setState] = useState(parsedLocalStorageWallet);

  const setAddress = (address) => {
    setState((prevState) => {
      const newState = { ...prevState, address };
      localStorage.setItem("wallet", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <WalletContext.Provider value={{ ...state, setAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletContextProvider };
