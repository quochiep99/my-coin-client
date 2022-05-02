// HOOKS
import { useContext } from "react";

// CONTEXTS
import { BlocksContext } from "../contexts/BlocksContext";

const useBlocks = () => useContext(BlocksContext);

export default useBlocks;
