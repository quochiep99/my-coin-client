import React, { useState, useEffect } from "react";

const BlocksContext = React.createContext({
  blocks: [],
});

const BlocksContextProvider = ({ children }) => {
  const [state, setState] = useState({ blocks: [] });
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/api/blocks");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setState({ blocks: data.blocks });
      }
    })();
  }, []);

  return (
    <BlocksContext.Provider value={state}>{children}</BlocksContext.Provider>
  );
};

export { BlocksContext, BlocksContextProvider };
