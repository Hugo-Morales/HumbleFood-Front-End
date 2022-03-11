import React from "react";
import { Link } from "react-router-dom";
const ButtonExit = ({ text, ruta, className }) => {
  return (
    <div>
      <Link to={ruta}>
        <button className={className}>{text}</button>
      </Link>
    </div>
  );
};

export default ButtonExit;
