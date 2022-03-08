import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import logo from "../../img/logo.png";
import Cart from "../cart/Cart";
import SearchBar from "../serchbar/SearchBar";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions";

const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 0px;
  top: 0px;
`;

const Nav = ({
  cartItems,
  getTotalItems,
  handleAddToCart,
  handleRemoveFromCart,
  handleDeleteFromCart,
}) => {
  const { isAuthenticated, user, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  // console.log(user);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently();

        localStorage.setItem('hora', JSON.stringify(token));
      } catch (error) {
        console.log(error);
      }
    }

    getToken();
  }, []);

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])


  return (
    <div className="font-poppins w-full h-24 bg-ochre flex justify-between">
      <div className="w-1/3 flex justify-between items-center p-1">
        <Link to="/" className="ml-4">
          <img src={logo} className="w-20" alt="logo" />
        </Link>
        <div className="ml-4">
          <SearchBar />
        </div>
        <div className="ml-4 w-full text-isabelline font-bold flex justify-around items-center">
          <select name="category" className="p-2 h-10 focus:outline-none bg-ochre hover:bg-princetonOrange font-bold border-none text-center">
            <option value="">Categorías</option>
            {
              categories?.map((c, index) => (
                <option key={index}>{c.name}</option>
              ))
            }
          </select>
          <Link to="/offers" className="ml-4 p-2 h-10 hover:bg-princetonOrange">
            Ofertas
          </Link>
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
              Bienvenido {user.given_name ? user.given_name : user.nickname}{" "}
            </h3>
            <img
              src={user.picture}
              alt="logo"
              className="w-10 rounded-full mr-3"
            />
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="flex items-center justify-center w-38 mr-3 px-4 py-2 space-x-3 text-sm text-center bg-darkGreen text-isabelline transition-colors duration-200 transform dark:text-gray-300 dark:border-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700 rounded-md"
            >
              Cerrar Sesión
            </button>
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
              Iniciar / Crear Cuenta
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
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleDeleteFromCart={handleDeleteFromCart}
      />
    </div>
  );
};

export default Nav;
