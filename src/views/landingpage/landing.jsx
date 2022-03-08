import React from "react";
import { Link } from "react-router-dom";
import Styles from "../landingpage/landingpage.module.css";

const LandingPage = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.title}>
        <div className={Styles.name}>
          <h1>Humblefood</h1>
        </div>
        <h2>Es igual de bueno, pero mas barato!</h2>
      </div>
      <div>
        <Link to="/home">
          <button className={Styles.button}>
            <span className={Styles.shadow}></span>
            <span className={Styles.edge}></span>
            <span className={`${Styles.front} ${Styles.text}`}>
              Empieza a descubrir!
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
