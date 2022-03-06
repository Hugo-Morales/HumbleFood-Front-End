import React from "react";
import Nav from "../components/nav/Nav";
import Cards from "../components/cards/Cards";
import { useAuth0 } from '@auth0/auth0-react';


const Home = ({
  data,
  cartItems,
  getTotalItems,
  handleAddToCart,
  handleRemoveFromCart,
  handleDeleteFromCart,
}) => {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
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
