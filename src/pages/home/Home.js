import React, { useReducer } from "react";

// MUI COMPONENTS
import Container from "@mui/material/Container";

import produce from "immer";

// MY COMPONENTS
import HomeCoinbaseWalletCard from "../../components/home/HomeCoinbaseWalletCard";
import HomeCreateNewWalletStepper from "../../components/home/HomeCreateNewWalletStepper";
import HomeImportWalletStepper from "../../components/home/HomeImportWalletStepper";

const initialStates = {
  homeCoinbaseWalletCard: true,
  homeCreateNewWalletStepper: false,
  homeImportWalletStepper: false,
};

const handlers = {
  SHOW_CREATE_NEW_WALLET_STEPPER: (state, action) => {
    return produce(state, (draft) => {
      draft.homeCoinbaseWalletCard = false;
      draft.homeCreateNewWalletStepper = true;
      draft.homeImportWalletStepper = false;
    });
  },

  SHOW_IMPORT_WALLET_STEPPER: (state, action) => {
    return produce(state, (draft) => {
      draft.homeCoinbaseWalletCard = false;
      draft.homeCreateNewWalletStepper = false;
      draft.homeImportWalletStepper = true;
    });
  },
};

const reducer = (state, action) => {
  return handlers[action.type](state, action);
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialStates);

  const handleClickCreateNewWallet = () => {
    dispatch({ type: "SHOW_CREATE_NEW_WALLET_STEPPER" });
  };

  const handleClickImportExistingWallet = () => {
    dispatch({ type: "SHOW_IMPORT_WALLET_STEPPER" });
  };

  return (
    <>
      {state.homeCoinbaseWalletCard && (
        <Container maxWidth="xs" sx={{ mt: "10vh", px: 0 }}>
          <HomeCoinbaseWalletCard
            onClickCreateNewWallet={handleClickCreateNewWallet}
            onClickImportExistingWallet={handleClickImportExistingWallet}
          />
        </Container>
      )}
      {state.homeCreateNewWalletStepper && (
        <Container maxWidth="md" sx={{ mt: "10vh", px: 0 }}>
          <HomeCreateNewWalletStepper />
        </Container>
      )}
      {state.homeImportWalletStepper && (
        <Container maxWidth="md" sx={{ mt: "10vh", px: 0 }}>
          <HomeImportWalletStepper />
        </Container>
      )}
    </>
  );
};

export default Home;
