import signTransactionData from "./signTransactionData";

const signUnconfirmedTransactionsData = (unconfirmedTransactionsData) => {
  for (let i = 0; i < unconfirmedTransactionsData.length; i++) {
    const unconfirmedTransactionData = unconfirmedTransactionsData[i];
    signTransactionData(unconfirmedTransactionData,);
  }
};

export default signUnconfirmedTransactionsData;
