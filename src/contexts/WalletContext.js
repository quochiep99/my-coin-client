import React, { useCallback, useEffect, useReducer } from "react";

import produce from "immer";

const initialStates = {
  encryptedWalletJSON: null,
  address: null,
  username: null,
  password: null,
  utxos: null, // unspent transaction outputs
  isInitialized: true,
};

const handlers = {
  UPDATE_ENCRYPTED_WALLET_JSON: (state, action) => {
    return produce(state, (draft) => {
      draft.encryptedWalletJSON = action.payload;
    });
  },

  UPDATE_PASSWORD: (state, action) => {
    return produce(state, (draft) => {
      draft.password = action.payload;
    });
  },

  UPDATE_ADDRESS: (state, action) => {
    return produce(state, (draft) => {
      draft.address = action.payload;
    });
  },

  UPDATE_UTXOS: (state, action) => {
    return produce(state, (draft) => {
      draft.utxos = action.payload;
    });
  },

  UPDATE_IS_INITIALIZE: (state, action) => {
    return produce(state, (draft) => {
      draft.isInitialized = action.payload;
    });
  },
};

const reducer = (state, action) => {
  return handlers[action.type](state, action);
};

const WalletContext = React.createContext({
  ...initialStates,
  updateEncryptedWalletJSON: (encryptedWalletJSON) => {},
  updatePassword: (password) => {},
  updateAddress: (address) => {},
  updateUTXOS: (blocks) => {},
});

const WalletContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStates);

  const updateEncryptedWalletJSON = (encryptedWalletJSON) => {
    dispatch({
      type: "UPDATE_ENCRYPTED_WALLET_JSON",
      payload: encryptedWalletJSON,
    });
  };

  const updatePassword = (password) => {
    dispatch({ type: "UPDATE_PASSWORD", payload: password });
  };

  const updateAddress = (address) => {
    dispatch({ type: "UPDATE_ADDRESS", payload: address });
  };

  const updateUTXOS = useCallback((utxos) => {
    dispatch({ type: "UPDATE_UTXOS", payload: utxos });
  }, []);

  useEffect(() => {
    const localStorageEncryptedWalletJSON =
      localStorage.getItem("encryptedWalletJSON") || "";
    const localStorageAddress = localStorage.getItem("address");
    const localStoragePassword = localStorage.getItem("password");
    try {
      const parsedLocalEncryptedWalletJSON = JSON.parse(
        localStorageEncryptedWalletJSON
      );
      if (!localStorageAddress || !localStoragePassword) {
        throw new Error("Token invalid");
      }

      dispatch({ type: "UPDATE_IS_INITIALIZE", payload: true });
      dispatch({
        type: "UPDATE_ENCRYPTED_WALLET_JSON",
        payload: parsedLocalEncryptedWalletJSON,
      });
      dispatch({
        type: "UPDATE_PASSWORD",
        payload: localStoragePassword,
      });
      dispatch({
        type: "UPDATE_ADDRESS",
        payload: localStorageAddress,
      });
    } catch (err) {
      dispatch({ type: "UPDATE_IS_INITIALIZE", payload: true });
      localStorage.removeItem("encryptedWalletJSON");
      localStorage.removeItem("password");
      localStorage.removeItem("address");
    } finally {
      // dispatch({ type: "UPDATE_IS_INITIALIZE", payload: true });
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        ...state,
        updateEncryptedWalletJSON,
        updatePassword,
        updateUTXOS,
        updateAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletContextProvider };
