import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import SearchBar from "../serchbar/SearchBar";

const Nav = () => {
  return (
    <div className="font-poppins w-full h-24 bg-ochre flex justify-between">
      <div className="w-1/2 flex justify-between items-center p-1">
        <Link to="/" className="ml-4">
          <img src={logo} className='w-20' alt="logo" />
        </Link>
        <div className='ml-4'>
          <SearchBar />
        </div>
        <div className="ml-4 w-full text-isabelline font-bold flex justify-around items-center">
          <Link to="/products" className="p-2 h-10 hover:bg-princetonOrange">
            Productos
          </Link>
          <select
            name="category"
            className="p-2 h-10 focus:outline-none bg-ochre hover:bg-princetonOrange font-bold border-none"
          >
            <option value="DEFAULT">Categorías</option>
            <option value="Ensaladas">Ensaladas</option>
            <option value="Carnes">Carnes</option>
            <option value="Postres">Postres</option>
            <option value="Mariscos">Mariscos</option>
          </select>
          <Link to="/offers" className="p-2 h-10 hover:bg-princetonOrange">
            Ofertas
          </Link>
          <Link to="/record" className="p-2 h-10 hover:bg-princetonOrange">
            Historial
          </Link>
        </div>
      </div>
      <div className="w-1/3 flex justify-between items-center mr-8">
        <Link
          to="/login"
          className="w-16 mr-1 px-4 py-2 space-x-3 text-sm text-center bg-green-500 text-isabelline transition-colors duration-200 transform dark:text-gray-300 dark:border-gray-300 hover:bg-gray-600 dark:hover:bg-green-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-shopping-cart"
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
            <circle cx="6" cy="19" r="2" />
            <circle cx="17" cy="19" r="2" />
            <path d="M17 17h-11v-14h-2" />
            <path d="M6 5l14 1l-1 7h-13" />
          </svg>
        </Link>
        <Link
          to="/register"
          className="flex items-center justify-center w-64 px-4 py-2 mr-1 space-x-3 text-sm text-center bg-darkGreen text-isabelline transition-colors duration-200 transform dark:text-gray-300 dark:border-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700"
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
            Crear cuenta
          </span>
        </Link>
        <Link
          to="/login"
          className="flex items-center justify-center w-64 px-4 py-2 space-x-3 text-sm text-center bg-darkGreen text-isabelline transition-colors duration-200 transform dark:text-gray-300 dark:border-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700"
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
            Iniciar sesión
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
