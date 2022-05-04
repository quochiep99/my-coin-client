// HOOKS
import { useContext } from "react";

// CONTEXTS
import { EnteredPasswordContext } from "../contexts/EnteredPasswordContext";

const useEnteredPassword = () => useContext(EnteredPasswordContext);

export default useEnteredPassword;
