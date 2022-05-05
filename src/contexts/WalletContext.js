import React, { useCallback, useEffect, useReducer } from "react";

import produce from "immer";

const initialStates = {
  encryptedWalletJSON: "",
  address: "",
  username: "",
  password: "",
  utxos: [], // unspent transaction outputs
  isInitialized: false,
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

  SIGNOUT: (state, action) => {
    console.log("SIGNOUT");
    // return initialStates;
    return produce(state, (draft) => {
      draft.encryptedWalletJSON = "";
      draft.address = "";
      draft.username = "";
      draft.password = "";
      draft.utxos = [];
      draft.isInitialized = true;
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
  signOut: () => {},
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

  const signOut = () => {
    //
    dispatch({ type: "SIGNOUT" });
  };
  useEffect(() => {
    const localStorageEncryptedWalletJSON =
      localStorage.getItem("encryptedWalletJSON") || "";
    const localStorageAddress = localStorage.getItem("address");
    const localStoragePassword = localStorage.getItem("password");
    try {
      if (
        !localStorageEncryptedWalletJSON ||
        !localStorageAddress ||
        !localStoragePassword
      ) {
        throw new Error("Token invalid");
      }

      dispatch({
        type: "UPDATE_ENCRYPTED_WALLET_JSON",
        payload: localStorageEncryptedWalletJSON,
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
      localStorage.removeItem("encryptedWalletJSON");
      localStorage.removeItem("password");
      localStorage.removeItem("address");
    } finally {
      dispatch({ type: "UPDATE_IS_INITIALIZE", payload: true });
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
        signOut,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletContextProvider };
