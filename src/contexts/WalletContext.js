import React, { useEffect, useState } from "react";

const WalletContext = React.createContext({
  address: "",
  username: "",
  utxos: [], // unspent transaction outputs
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
      const newState = { ...prevState, address };
      localStorage.setItem("wallet", JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    const localStorageWallet = localStorage.getItem("wallet") || "";
    try {
      const parsedLocalStorageWallet = JSON.parse(localStorageWallet);
      setState(parsedLocalStorageWallet);
    } catch (err) {
      localStorage.removeItem("wallet");
      console.log(err);
    }
  }, []);

  return (
    <WalletContext.Provider value={{ ...state, setAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletContextProvider };
