import React, { useEffect, useReducer } from "react";

import produce from "immer";
import useWallet from "../hooks/useWallet";

const getUTXOS = (blocks, address) => {
  let utxos = [];
  // ignore the genesis block, i starts from 1
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    const transactions = JSON.parse(block.data);
    // find unspent transacctions that are sent to this user's address
    for (let j = 0; j < transactions.length; j++) {
      const transaction = transactions[j];
      const transactionData = transaction.data;
      // ethers.
      if (transactionData.to === address) {
        if (transactionData.status === "unspent") {
          utxos.push(transactionData);
        } else if (transactionData.status === "spent") {
          // find the UTXO in utxos array that has the same hash as this transaction.hash
          // then remove it
          utxos = utxos.filter((utxo) => {
            return utxo.hash === transaction.hash;
          });
        }
      }
    }
  }
  return utxos;
};

const initialStates = {
  blocks: [],
};

const handlers = {
  CREATE_BLOCK: (state, action) => {
    return produce(state, (draft) => {
      draft.blocks.push(action.payload);
    });
  },

  UPDATE_BLOCKS: (state, action) => {
    return produce(state, (draft) => {
      draft.blocks = action.payload;
    });
  },
};

const reducer = (state, action) => {
  return handlers[action.type](state, action);
};

const BlocksContext = React.createContext({
  ...initialStates,
  createBlock: (block) => {},
});

const BlocksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStates);
  const { updateUTXOS, address, utxos } = useWallet();

  const createBlock = (block) => {
    dispatch({ type: "CREATE_BLOCK", payload: block });
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blocks");
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: "UPDATE_BLOCKS", payload: data.blocks });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (state.blocks.length > 0 && address) {
      const newUTXOS = getUTXOS(state.blocks, address);
      if (newUTXOS.length !== utxos.length) {
        updateUTXOS(newUTXOS);
      } else {
        if (
          !newUTXOS.every((element, index) => {
            return element.hash === utxos[index].hash;
          })
        ) {
          updateUTXOS(newUTXOS);
        }
      }
    }
  }, [address, state.blocks, updateUTXOS, utxos]);

  return (
    <BlocksContext.Provider value={{ ...state, createBlock }}>
      {children}
    </BlocksContext.Provider>
  );
};

export { BlocksContext, BlocksContextProvider };
