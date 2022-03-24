import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../components/loading/Loading";
import { stop } from "../../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import Map from "./map";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const api_key = process.env.REACT_APP_API_KEY;

const DirectionMap = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cargando = useSelector((state) => state.isLoading);
  const MySwal = withReactContent(Swal);
  const URL = "https://maps.googleapis.com/maps/api/js?v=3.exp&key=";
  const direction = useSelector(
    (state) => state?.shopDirection[0]
  );

  // if (direction) console.log(direction);

  useEffect(() => {
    setTimeout(() => {
      dispatch(stop());
    }, 2000);
  }, [dispatch]);

  const handleClick = () => {
    MySwal.fire({
      position: "center",
      icon: "success",
      title: "Gracias por verificarla!",
      showConfirmButton: false,
      timer: 2000,
    }).then((r) => {
      if (r.isDismissed) {
        navigate(`/createShop`);
      }
    });
  };

  return (
    <>
      {cargando ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="relative bg-white overflow-hidden mr-10 ml-10 pb-11">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <nav
                  className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                  aria-label="Global"
                >
                  <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                    <div className="flex items-center justify-between w-full md:w-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-map-2"
                        width="60"
                        height="60"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="#00b341"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="18" y1="6" x2="18" y2="6.01" />
                        <path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5" />
                        <polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15" />
                        <line x1="9" y1="4" x2="9" y2="17" />
                        <line x1="15" y1="15" x2="15" y2="20" />
                      </svg>
                    </div>
                  </div>
                </nav>
              </div>

              <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-black-600 sm:text-5xl md:text-6xl text-center">
                    <span className="block xl:inline">
                      ¡Verifica si la dirección
                    </span>{" "}
                    <span className="block text-green-600 xl:inline">
                      de la tienda a registrar existe!
                    </span>
                  </h1>

                  <div className="w-full flex flex-col">
                    <label className="font-bold">Esta es su dirección: </label>
                    <input
                      className="border-black border-2 p-2"
                      disabled
                      value={direction}
                    />
                  </div>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link
                        exact
                        to="/createShop"
                        className=" w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 md:py-4 md:text-lg md:px-10"
                      >
                        Volver a registrar tienda
                      </Link>
                    </div>

                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <button
                        onClick={() => handleClick()}
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                      >
                        ¿Listo?
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-2/5 lg:mt-12">
            <Map
              googleMapURL={`${URL}${api_key}&libraries=places`}
              containerElement={
                <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" />
              }
              mapElement={<div className="h-full rounded-xl mt-10" />}
              loadingElement={<p>Cargando</p>}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DirectionMap;
