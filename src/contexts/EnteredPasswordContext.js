import React, { useState } from "react";

const EnteredPasswordContext = React.createContext({
  enteredPassword: "",
  setEnteredPassword: (enteredPassword) => {},
});

const EnteredPasswordContextProvider = ({ children }) => {
  const [state, setState] = useState({
    enteredPassword: "",
  });

  const setEnteredPassword = (enteredPassword) => {
    setState((prevState) => {
      return {
        ...prevState,
        enteredPassword,
      };
    });
  };

  return (
    <EnteredPasswordContext.Provider value={{ ...state, setEnteredPassword }}>
      {children}
    </EnteredPasswordContext.Provider>
  );
};

export { EnteredPasswordContext, EnteredPasswordContextProvider };
