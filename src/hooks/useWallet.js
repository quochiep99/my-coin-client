// HOOKS
import { useContext } from "react";

// CONTEXTS
import { WalletContext } from "../contexts/WalletContext";

const useWallet = () => useContext(WalletContext);

export default useWallet;
