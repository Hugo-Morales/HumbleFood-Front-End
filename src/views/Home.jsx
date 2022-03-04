import React from "react";
import Nav from "../components/nav/Nav";
import Cards from "../components/cards/Cards";

const Home = ({ getTotalItems, handleAddToCart, handleRemoveFromCart, cartItems }) => {
  return (
    <div>
      <Nav getTotalItems={getTotalItems} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} cartItems={cartItems}/>
      <Cards handleAddToCart={handleAddToCart} cartItems={cartItems} />
    </div>
  );
};

export default Home;
