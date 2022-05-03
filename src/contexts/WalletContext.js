import React, { useState } from "react";

const WalletContext = React.createContext({
  address: "",
  username: "",
  utxos: [], // unspent transaction outputs
  setAddress: (publicKey) => {},
  setUsername: (username) => {},
  setUTXOS: (utxos) => {},
});

const WalletContextProvider = ({ children }) => {
  const [state, setState] = useState({
    address: "",
    username: "",
    utxos: [], // unspent transaction outputs
  });

  const setAddress = (address) => {
    setState((prevState) => ({ ...prevState, address }));
  };

  return (
    <WalletContext.Provider value={{ ...state }}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletContextProvider };
