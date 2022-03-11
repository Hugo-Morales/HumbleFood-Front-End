import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loading } from "../../redux/actions";
import Styles from "../landingpage/landingpage.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { postnewUser } from "../../redux/actions";

const LandingPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth0();

  console.log(user);

  useEffect(() => {
    return () => {
      dispatch(loading());
    };
  }, []);

  const newUser = {
    userId: user?.sub.split("|")[1],
    name: user?.name,
    name_user: user?.nickname,
    email: user?.email,
    direction: "",
  };

  // if (user) {
  //   console.log(newUser);
  // }

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(postnewUser(newUser));
      console.log('registrado')
    }
  });

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
