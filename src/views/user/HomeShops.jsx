import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShops } from "../../redux/actions";
import Nav from "../../components/nav/Nav";
import Carousell from "../../components/carousell/Carousell";
import Cards from "../../components/shops/CardsShops";

function HomeShops({
  cartItems,
  getTotalItems,
  handleAddToCart,
  handleRemoveFromCart,
  handleDeleteFromCart,
}) {
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shops);

  useEffect(() => {
    dispatch(getShops());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(shops);
  return (
    <div>
      <Nav
        cartItems={cartItems}
        getTotalItems={getTotalItems}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleDeleteFromCart={handleDeleteFromCart}
      />
      <Carousell />
      <Cards
            shops={shops}
            handleAddToCart={handleAddToCart}
            cartItems={cartItems}
          />
    </div>
  );
}

export default HomeShops;
