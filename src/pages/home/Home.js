import React, { useState } from "react";

// MUI COMPONENTS
import Container from "@mui/material/Container";

// MY COMPONENTS
import HomeCoinbaseWalletCard from "../../components/home/HomeCoinbaseWalletCard";
import HomeCreateNewWalletStepper from "../../components/home/HomeCreateNewWalletStepper";

const Home = () => {
  const [showCard, setShowCard] = useState(false);
  const handleClick = () => {
    setShowCard(false);
  };

  return (
    <>
      {showCard && (
        <Container maxWidth="xs" sx={{ mt: "10vh", px: 0 }}>
          <HomeCoinbaseWalletCard onClick={handleClick} />
        </Container>
      )}
      {!showCard && (
        <Container maxWidth="md" sx={{ mt: "10vh", px: 0 }}>
          <HomeCreateNewWalletStepper onClick={handleClick} />
        </Container>
      )}
    </>
  );
};

export default Home;
