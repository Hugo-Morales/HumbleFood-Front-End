import React from "react";
import { Link } from "react-router-dom";

function userType() {
  return (
    <div className="relative min-h-screen flex">
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        {/* Parte Izquierda Tienda */}
        <div className="sm:w-1/2 xl:w-1/2 h-full hidden md:flex flex-auto items-center justify-center overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative fondo_user">
          <div className="absolute bg-gradient-to-b from-stone-600 to-slate-900 opacity-75 inset-0 z-0"></div>
          <div className="w-96 z-10 justify-center items-center">
            <Link to="/register/buyer">
              <button className="text-sm font-semibold leading-none text-white bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full justify-center">
                Como Comprador
              </button>
            </Link>
          </div>
        </div>

        {/* Parte Derecha User */}
        <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full xl:w-1/2 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white fondo_rest">
          <div className="absolute w-1/2 bg-gradient-to-t from-transparent via-stone-800 to-indigo-800 opacity-75 top-0 right-0 bottom-0 z-0"></div>
          <div className="w-96 z-10 justify-center items-center">
            <Link to="/register/seller">
              <button className="text-sm font-semibold leading-none text-white bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
                Como Tienda
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default userType;
