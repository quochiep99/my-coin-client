import React, { useEffect, useState } from "react";

const WalletContext = React.createContext({
  address: "",
  username: "",
  utxos: [], // unspent transaction outputs
  isInitialized: false,
  setAddress: (address) => {},
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
    setState((prevState) => {
      const newState = { ...prevState, address, isInitialized: true };
      localStorage.setItem("wallet", JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    const localStorageWallet = localStorage.getItem("wallet") || "";
    try {
      const parsedLocalStorageWallet = JSON.parse(localStorageWallet);
      setState({ ...parsedLocalStorageWallet, isInitialized: true });
    } catch (err) {
      localStorage.removeItem("wallet");
      setState((prevState) => {
        return { ...prevState, isInitialized: true };
      });
    }
  }, []);

  return (
    <WalletContext.Provider value={{ ...state, setAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletContextProvider };
