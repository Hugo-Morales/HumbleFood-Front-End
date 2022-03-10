import React from "react";
import { Link } from "react-router-dom";
const ButtonExit = () => {
  return (
    <div>
      <Link to="/home">
        <button className="mt-4 bg-red-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full">
          Salir
        </button>
      </Link>
    </div>
  );
};

export default ButtonExit;
