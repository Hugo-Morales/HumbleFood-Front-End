import React from "react";
import Nav from "../components/nav/Nav";
import Cards from "../components/cards/Cards";
import { useAuth0 } from '@auth0/auth0-react';

const Home = ({ getTotalItems, handleAddToCart, handleRemoveFromCart, cartItems }) => {
  // const {
  //   isLoading,
  //   isAuthenticated,
  //   error,
  //   user,
  //   loginWithRedirect,
  //   logout,
  // } = useAuth0();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Oops... {error.message}</div>;
  // }

  // if (isAuthenticated) {
  //   return (
  //     <div>
  //       Hello {user.name}{' '}
  //       <button onClick={() => logout({ returnTo: window.location.origin })}>
  //         Log out
  //       </button>
  //     </div>
  //   );
  // } else {
  //   return <Nav />;
  // }

  return (
    <div>
      <Nav getTotalItems={getTotalItems} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} cartItems={cartItems} />
      <Cards handleAddToCart={handleAddToCart} cartItems={cartItems} />
    </div>
  );
};

export default Home;
