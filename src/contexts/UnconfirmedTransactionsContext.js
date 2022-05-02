import React, { useEffect, useState } from "react";

const UnconfirmedTransactionsContext = React.createContext();

const UnconfirmedTransactionsContextProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://localhost:5000/api/unconfirmedTransactions"
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTransactions(data);
      }
    })();
  }, []);

  return (
    <UnconfirmedTransactionsContext.Provider value={transactions}>
      {children}
    </UnconfirmedTransactionsContext.Provider>
  );
};

export {
  UnconfirmedTransactionsContext,
  UnconfirmedTransactionsContextProvider,
};
