import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import NavShops2 from "./NavShops2";
import Loading from "../loading/Loading";
import CardFavorites from "./CardFavorites";
import { getAllFavorites, loading, stop, reset } from "../../redux/actions";

export default function Favorites() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth0();
  const all = useSelector((state) => state.allFavorites);
  const cargando = useSelector((state) => state.isLoading);
  const id = user?.sub.split("|")[1];

  useEffect(() => {
    dispatch(loading());
    if (isAuthenticated) {
      dispatch(getAllFavorites(id));
    }
    dispatch(stop());

    return () => {
      dispatch(reset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {cargando ? (
        <Loading />
      ) : (
        <>
          <NavShops2 />
          {all.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mobile:px-auto md:mx-20">
              {all.map((p, index) => (
                <div key={index} className="mb-5 mr-5">
                  <CardFavorites shop={p} />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mt-6 mx-5 text-center font-bold">
                {id ? (
                  <h1>Actualmente no tenes ningún restaurante añadido.</h1>
                ) : (
                  <h1>Tenes que estar registrado</h1>
                )}
              </div>
              <div className="flex justify-center items-center mt-10">
                <Link
                  to="/home"
                  className="bg-red-600 p-3 rounded-lg font-bold"
                >
                  <h1>Volver al inicio</h1>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
