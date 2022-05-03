// HOOKS
import { useContext } from "react";

// CONTEXTS
import { UnconfirmedTransactionsContext } from "../contexts/UnconfirmedTransactionsContext";

const useUnconfirmedTransactions = () =>
  useContext(UnconfirmedTransactionsContext);

export default useUnconfirmedTransactions;
