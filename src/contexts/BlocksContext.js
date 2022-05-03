import React, { useState, useEffect } from "react";

const BlocksContext = React.createContext({
  blocks: [],
  addBlock: (block) => {},
});

const BlocksContextProvider = ({ children }) => {
  const [state, setState] = useState({ blocks: [] });

  const addBlock = (block) => {
    setState((prevState) => {
      return {
        ...prevState,
        block,
      };
    });
  };
  
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/api/blocks");
      if (response.ok) {
        const data = await response.json();
        setState({ blocks: data.blocks });
      }
    })();
  }, []);

  return (
    <BlocksContext.Provider value={{ ...state, addBlock }}>
      {children}
    </BlocksContext.Provider>
  );
};

export { BlocksContext, BlocksContextProvider };
