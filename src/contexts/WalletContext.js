import React, { useEffect, useState } from "react";

import bcrypt from "bcryptjs";

const WalletContext = React.createContext({
  encryptedWalletJSON: "",
  username: "",
  utxos: [], // unspent transaction outputs
  password: "",
  isInitialized: false,
  setEncryptedWalletJSON: (encryptedWalletJSON) => {},
  setUsername: (username) => {},
  setUTXOS: (blocks) => {},
  getBalance: () => {},
});

const WalletContextProvider = ({ children }) => {
  const [state, setState] = useState({
    encryptedWalletJSON: "",
    username: "",
    utxos: [], // unspent transaction outputs
    password: "",
    isInitialized: false,
  });

  const setEncryptedWalletJSON = (encryptedWalletJSON) => {
    setState((prevState) => {
      const newState = { ...prevState, encryptedWalletJSON };
      localStorage.setItem("wallet", newState);
      return newState;
    });
  };

  const setPassword = (password) => {
    setState((prevState) => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newState = { ...prevState, password: hashedPassword };
      localStorage.setItem("wallet", JSON.stringify(newState));
      return newState;
    });
  };

  const setUTXOS = (blocks) => {
    const newUTXOS = [];
    // ignore the genesis block, i starts from 1
    for (let i = 1; i < blocks.length; i++) {
      const block = blocks[i];
      const transactions = JSON.parse(block.data);
      // find unspent transacctions that are sent to this user's address
      for (let j = 0; j < transactions.length; j++) {
        const transaction = transactions[i];
        if (
          transaction.to === state.address &&
          transaction.status === "unspent"
        ) {
          newUTXOS.push(transaction);
        }
      }
    }
    setState((prevState) => {
      return {
        ...prevState,
        utxos: newUTXOS,
      };
    });
  };

  const getBalance = () => {
    let balance = 0;
    for (let i = 0; i < state.utxos.length; i++) {
      balance += state.utxos[i].amount;
    }
    return balance;
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
    <WalletContext.Provider
      value={{ ...state, setEncryptedWalletJSON, setPassword, setUTXOS }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletContextProvider };
