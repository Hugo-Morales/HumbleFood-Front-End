import React from "react";
import Nav from "../components/nav/Nav";
import Cards from "../components/cards/Cards";
import { useAuth0 } from '@auth0/auth0-react';

const Home = ({ getTotalItems, handleAddToCart, handleRemoveFromCart, cartItems }) => {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Nav getTotalItems={getTotalItems} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} cartItems={cartItems} />
      <Cards handleAddToCart={handleAddToCart} cartItems={cartItems} />
    </div>
  );
};

export default Home;
