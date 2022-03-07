import React, { useEffect } from "react";
import Nav from "../components/nav/Nav";
import Cards from "../components/cards/Cards";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { getallproducts } from "../redux/actions";

const Home = ({
  data,
  cartItems,
  getTotalItems,
  handleAddToCart,
  handleRemoveFromCart,
  handleDeleteFromCart,
}) => {
  const dispatch = useDispatch();
  const productsloaded = useSelector((state) => state.productsloaded);

  useEffect(() => {
    dispatch(getallproducts());
  }, [dispatch]);

  console.log(productsloaded);

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
        productsloaded={productsloaded}
        data={data}
        handleAddToCart={handleAddToCart}
        cartItems={cartItems}
      />
    </div>
  );
};

export default Home;
