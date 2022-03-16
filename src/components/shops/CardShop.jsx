import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillHeartFill } from "react-icons/bs";
import {
  addFavorites,
  getAllFavorites,
  removeFavorites,
} from "../../redux/actions";

const CardShop = ({ shop }) => {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const { id, name, image, description } = shop;
  const misfavoritos = useSelector((state) => state.allFavorites);
  const userId = user?.sub.split("|")[1];
  const shopsID = misfavoritos.map((i) => i.id);
  const shopIdguardado = shopsID.includes(id);

  // console.log(shopID.includes(id))

  const guardar = () => {
    // console.log(id);
    dispatch(addFavorites(userId, id));
    dispatch(getAllFavorites(userId));
  };

  const borrar = async () => {
    // console.log(id);
    dispatch(removeFavorites(userId, id));
    dispatch(getAllFavorites(userId));
  };

  return (
    <>
      <div className="flex justify-center items-center mobile:ml-6 mobile:w-11/12 w-full drop-shadow-lg">
        <div className="w-full relative bg-white shadow-md h-96 rounded-xl  flex flex-col justify-around items-center overflow-hidden sm:flex-row sm:h-52 sm:w-11/12 md:w-96 md:h-64">
          <div className="absolute top-0 md:left-0 md:w-2/3 md:h-full">
            <img
              className="w-full h-3/4 max-h-72 md:h-full"
              src={image}
              alt="comida"
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={shopIdguardado ? borrar : guardar}
          >
            <button className="absolute bg-gray-600 text-white p-2.5 rounded-sm shadow-md top-0 left-0">
              <BsFillHeartFill
                className={shopIdguardado ? "text-red-600" : "text-white-500"}
              />
            </button>
          </div>
          <div className="md:absolute md:right-0 md:top-0 w-full flex justify-center md:h-full md:w-1/3">
            <div className="absolute mobile:bottom-4 mobile:left-4 flex flex-col justify-start items-baseline">
              <Link to={`/productShop/${id}`}>
                <h1 className="text-xl md:text-lg font-bold mb-2 text-gray-600 font-sans">
                  {name}
                </h1>
              </Link>
              <p className="text-md md:text-sm text-black w-4/5">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardShop;
