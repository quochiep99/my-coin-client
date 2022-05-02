import React, { useEffect, useState } from "react";

const UnconfirmedTransactionsContext = React.createContext();

const UnconfirmedTransactionsContextProvider = ({ children }) => {
  const [state, setState] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://localhost:5000/api/unconfirmedTransactions"
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setState(data.transactions);
      }
    })();
  }, []);

  return (
    <UnconfirmedTransactionsContext.Provider value={state}>
      {children}
    </UnconfirmedTransactionsContext.Provider>
  );
};

export {
  UnconfirmedTransactionsContext,
  UnconfirmedTransactionsContextProvider,
};
