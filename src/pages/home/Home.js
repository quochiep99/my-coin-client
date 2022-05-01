import React, { useState } from "react";

// MUI COMPONENTS
import Container from "@mui/material/Container";

// MY COMPONENTS
import HomeCoinbaseWalletCard from "../../components/home/HomeCoinbaseWalletCard";
import HomeCreateNewWalletStepper from "../../components/home/HomeCreateNewWalletStepper";
import HomeImportWalletStepper from "../../components/home/HomeImportWalletStepper";

const Home = () => {
  const [show, setShow] = useState({
    homeCoinbaseWalletCard: true,
    homeCreateNewWalletStepper: false,
    homeImportWalletStepper: false,
  });

  const handleClickCreateNewWallet = () => {
    setShow({
      homeCoinbaseWalletCard: false,
      homeCreateNewWalletStepper: true,
      homeImportWalletStepper: false,
    });
  };

  const handleClickImportExistingWallet = () => {
    setShow({
      homeCoinbaseWalletCard: false,
      homeCreateNewWalletStepper: false,
      homeImportWalletStepper: true,
    });
  };

  return (
    <>
      {show.homeCoinbaseWalletCard && (
        <Container maxWidth="xs" sx={{ mt: "10vh", px: 0 }}>
          <HomeCoinbaseWalletCard
            onClickCreateNewWallet={handleClickCreateNewWallet}
            onClickImportExistingWallet={handleClickImportExistingWallet}
          />
        </Container>
      )}
      {show.homeCreateNewWalletStepper && (
        <Container maxWidth="md" sx={{ mt: "10vh", px: 0 }}>
          <HomeCreateNewWalletStepper />
        </Container>
      )}
      {show.homeImportWalletStepper && (
        <Container maxWidth="md" sx={{ mt: "10vh", px: 0 }}>
          <HomeImportWalletStepper />
        </Container>
      )}
    </>
  );
};

export default Home;
