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
import { filterProductsByCategories, getCategories } from "../../redux/actions";

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
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  // console.log(user);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently();

        localStorage.setItem("hora", JSON.stringify(token));
      } catch (error) {
        console.log(error);
      }
    };

    getToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
<<<<<<< HEAD
    dispatch(getCategories());
  }, [dispatch]);
=======
    dispatch(getCategories())
  }, [dispatch])
  function handleFilterCategories(e) {
    dispatch(filterProductsByCategories(e.target.value))
    console.log(e.target.value)
  }
>>>>>>> b7c329643d9fefe867a7604bc429c8cee0ee69e3

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
<<<<<<< HEAD
          <select
            name="category"
            className="p-2 h-10 focus:outline-none bg-ochre hover:bg-princetonOrange font-bold border-none text-center"
          >
            <option value="">Categorías</option>
            {categories?.map((c, index) => (
              <option key={index}>{c.name}</option>
            ))}
=======
          <select onChange={e => handleFilterCategories(e)} name="category" className="p-2 h-10 focus:outline-none bg-ochre hover:bg-princetonOrange font-bold border-none text-center">
            <option value="All">Categorías</option>
            {
              categories?.map((c, index) => {
                return (
                  <option key={index} value={c.name}>{c.name}</option>

                )
              })
            }
>>>>>>> b7c329643d9fefe867a7604bc429c8cee0ee69e3
          </select>
          <Link to="/offers" className="ml-4 p-2 h-10 hover:bg-princetonOrange">
            Ofertas
          </Link>
          {isAuthenticated ? (
            <Link to="/createShop">
              <button className="flex items-center justify-center w-20 mr-3 px-4 py-2 space-x-3 text-sm text-center bg-lime-700 text-isabelline transition-colors duration-200 transfor hover:bg-lime-600 active:bg-lime-700 focus:outline-none focus:ring focus:ring-lime-300 rounded-md">
                {" "}
                Registra tu tienda!
              </button>
            </Link>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className=" flex items-center justify-center w-20 mr-3 px-4 py-2 space-x-3 text-sm text-center bg-lime-700 text-isabelline transition-colors duration-200 transform hover:bg-lime-600 active:bg-lime-700 focus:outline-none focus:ring focus:ring-lime-300 rounded-md"
            >
              {" "}
              Quieres vender?
            </button>
          )}
        </div>
        {/* 
        <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Dropdown <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>

        <div id="dropdownNavbar" className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
          <ul className="py-1" aria-labelledby="dropdownLargeButton" />
          <li>
            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">{
              categories?.map((c, index) => (
                <option key={index}>{c.name}</option>
              ))
            }</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Settings</a>
          </li>
        </div>
      </div> */}
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
