import React from "react";
import Nav from "../components/nav/Nav";
import Cards from "../components/cards/Cards";

const Home = ({
  data,
  cartItems,
  getTotalItems,
  handleAddToCart,
  handleRemoveFromCart,
  handleDeleteFromCart,
}) => {
  return (
    <div>
      <Nav
        cartItems={cartItems}
        getTotalItems={getTotalItems}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleDeleteFromCart={handleDeleteFromCart}
      />
      <Cards
        data={data}
        handleAddToCart={handleAddToCart}
        cartItems={cartItems}
      />
    </div>
  );
};

export default Home;
