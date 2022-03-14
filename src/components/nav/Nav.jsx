import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import logo from "../../img/logo.png";
import Cart from "../cart/Cart";
import SearchBar from "../serchbar/SearchBar";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProductsByCategories,
  filterProductsByDiscounts,
  getDiscounts,
  getCategories,
} from "../../redux/actions";

const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 0px;
  top: 0px;
`;

const Nav = ({
  cartItems,
  setCartItems,
  shopEmail,
  getTotalItems,
  handleAddToCart,
  handleRemoveFromCart,
  handleDeleteFromCart,
}) => {
  const { shopId } = useParams();
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const discounts = useSelector((state) => state.discounts);
  const [open, setOpen] = useState(false);

  const user_id = user?.sub.split("|")[1];
  console.log(shopEmail);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getDiscounts(shopId));
  }, [dispatch]);

  function handleFilterCategories(e) {
    dispatch(filterProductsByCategories(shopId, e.target.value));
    console.log(e.target.value);
  }

  function handleFilterOffers(e) {
    dispatch(filterProductsByDiscounts(shopId, e.target.value));
    // console.log(e.target.value);
  }

  return (
    <div className="font-poppins w-full h-24 bg-ochre flex justify-between">
      <div className="w-1/3 flex justify-between items-center p-1">
        <Link to="/home" className="ml-4">
          <img src={logo} className="w-10 sm:w-11 lg:w-16" alt="logos" />
        </Link>
        <div className="ml-4">
          <SearchBar />
        </div>
        <div className="ml-8 w-full text-isabelline font-bold flex justify-around items-center">
          <select
            onChange={(e) => handleFilterCategories(e)}
            name="categorys"
            className="p-2 h-10 focus:outline-none bg-ochre hover:bg-princetonOrange font-bold border-none text-center"
          >
            <option value="">Categorías</option>
            {categories?.map((c, index) => {
              return (
                <option key={index} value={c.name}>
                  {c.name}
                </option>
              );
            })}
          </select>

          <select
            onChange={(e) => handleFilterOffers(e)}
            name="offers"
            className="p-2 h-10 focus:outline-none bg-ochre hover:bg-princetonOrange font-bold border-none text-center"
          >
            <option value="">Ofertas de la tienda</option>
            {discounts?.map((d, index) => {
              return (
                <option key={index} value={d}>
                  {d}%
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div
        className={
          isAuthenticated
            ? "w-1/4 flex justify-around items-center mr-8"
            : "w-1/6 flex justify-beetwen items-center mr-8"
        }
      >
        {isAuthenticated ? (
          <div className="flex items-center">
            <h3 className="mr-3">
              Bienvenid@ {user.given_name ? user.given_name : user.nickname}{" "}
            </h3>
            <img
              src={user.picture}
              alt="logo"
              className="w-10 rounded-full mr-3"
            />
            <Link to={`/settings/${user_id}`}>
              <button className="flex items-center justify-center w-38 mr-3 px-4 py-2 space-x-3 text-sm text-center bg-darkGreen text-isabelline transition-colors duration-200 transform dark:text-gray-300 dark:border-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700 rounded-md">
                Panel de Usuario
              </button>
            </Link>
          </div>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="flex items-center justify-center w-38 mr-3 px-4 py-2 space-x-3 text-sm text-center bg-darkGreen text-isabelline transition-colors duration-200 transform dark:text-gray-300 dark:border-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-user-circle"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="10" r="3" />
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
            </svg>
            <span className="text-sm text-white dark:text-gray-200">
              Iniciar / Crear Cuenta d
            </span>
          </button>
        )}
        <div className={open ? "opacity-0" : "bg-emerald-400 rounded-full"}>
          <StyledButton onClick={() => setOpen(true)}>
            <Badge badgeContent={getTotalItems(cartItems)} color="error">
              <AddShoppingCartIcon />
            </Badge>
          </StyledButton>
        </div>
      </div>
      <Cart
        open={open}
        setOpen={setOpen}
        cartItems={cartItems}
        setCartItems={setCartItems}
        shopEmail={shopEmail}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleDeleteFromCart={handleDeleteFromCart}
      />
    </div>
  );
};

export default Nav;
