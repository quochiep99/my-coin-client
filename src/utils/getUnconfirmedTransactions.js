import { ethers } from "ethers";
import produce from "immer";

// Utils
import signTransactionData from "./signTransactionData";

const getUnconfirmedTransactions = (funds, mainTransactionData, privateKey) => {
  let unconfirmedTransactions = [];
  let unconfirmedTransaction;
  let unconfirmedTransactionData;
  let unconfirmedTransactionSignature;

  for (let i = 0; i < funds.utxos.length; i++) {
    unconfirmedTransactionData = produce(funds.utxos[i], (draft) => {
      draft.status = "spent";
    });
    unconfirmedTransactionSignature = signTransactionData(
      unconfirmedTransactionData,
      privateKey
    );
    unconfirmedTransaction = {
      data: unconfirmedTransactionData,
      signature: unconfirmedTransactionSignature,
    };
    unconfirmedTransactions.push(unconfirmedTransaction);
  }

  // ===
  unconfirmedTransactionData = {
    from: mainTransactionData.from,
    to: mainTransactionData.to,
    amount: mainTransactionData.amount,
    status: "unspent",
    timestamp: Math.floor(Date.now() / 1000),
  };
  unconfirmedTransactionData.hash = ethers.utils.id(
    JSON.stringify({
      ...unconfirmedTransactionData,
      status: undefined,
    })
  );
  unconfirmedTransactionSignature = signTransactionData(
    unconfirmedTransactionData,
    privateKey
  );
  unconfirmedTransaction = {
    data: unconfirmedTransactionData,
    signature: unconfirmedTransactionSignature,
  };

  unconfirmedTransactions.push(unconfirmedTransaction);

  // ===

  if (funds.total - mainTransactionData.amount > 0) {
    unconfirmedTransactionData = {
      from: "CHANGE",
      to: mainTransactionData.from,
      amount: funds.total - mainTransactionData.amount,
      status: "unspent",
      timestamp: Math.floor(Date.now() / 1000),
    };
    unconfirmedTransactionData.hash = ethers.utils.id(
      JSON.stringify({
        ...unconfirmedTransactionData,
        status: undefined,
      })
    );
    unconfirmedTransactionSignature = signTransactionData(
      unconfirmedTransactionData,
      privateKey
    );
    unconfirmedTransaction = {
      data: unconfirmedTransactionData,
      signature: unconfirmedTransactionSignature,
    };
    unconfirmedTransactions.push(unconfirmedTransaction);
  }
  return unconfirmedTransactions;
};

export default getUnconfirmedTransactions;
