// HOOKS
import { useContext } from "react";

// CONTEXTS
import { UnconfirmedTransactionsContext } from "../contexts/UnconfirmedTransactionsContext";

const useUnConfirmedTransactions = () =>
  useContext(UnconfirmedTransactionsContext);

export default useUnConfirmedTransactions;
