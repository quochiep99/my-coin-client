import React from "react";

// MUI COMPONENTS
import Container from "@mui/material/Container";

// MY COMPONENTS
import HomeCoinbaseWalletCard from "../../components/home/HomeCoinbaseWalletCard";

const Home = () => {
  return (
    <Container maxWidth="xs" sx={{ mt: "10vh" }}>
      <HomeCoinbaseWalletCard />
    </Container>
  );
};

export default Home;
