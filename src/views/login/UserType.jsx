import React from "react";
import { Link } from "react-router-dom";

function userType() {
  return (
    <div className="mt-2 flex">
      <Link to="/register/buyer">
        <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
          Como Comprador
        </button>
      </Link>
      <Link to="/register/seller">
        <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
          Como Tienda
        </button>
      </Link>
    </div>
  );
}

export default userType;
