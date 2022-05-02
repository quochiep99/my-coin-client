import React, { useState } from "react";

const WalletContext = React.createContext({
  publicKey: "",
  username: "",
  balance: "",
  setPublicKey: (publicKey) => {},
  setUsername: (username) => {},
  setBalance: (balance) => {},
});

const WalletContextProvider = ({ children }) => {
  const [state, setState] = useState({
    publicKey: "",
    username: "",
    balance: "",
  });

  const setPublicKey = (publicKey) => {
    setState((prevState) => ({ ...prevState, publicKey }));
  };

  return (
    <WalletContext.Provider value={{ ...state, setPublicKey }}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletContextProvider };
