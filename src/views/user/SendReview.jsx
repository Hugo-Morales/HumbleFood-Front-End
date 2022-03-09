import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { postReview } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Stack from "@mui/material/Stack";

function SendReview() {
  const {
    isAuthenticated,
    // loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  const dispatch = useDispatch();
  const id = useParams();
  const [token, setToken] = useState("");
  const [productId, setProductId] = useState("");
  const [value, setValue] = useState(0);
  const [review, setReview] = useState("");
  // console.log(id);
  // console.log("user", user);
  // console.log("isAuth", isAuthenticated);
  // console.log(value);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        localStorage.setItem("hora", JSON.stringify(token));
        setToken(token);
        setProductId(id.productId);
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(id.productId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userReview = {
      userId: token,
      productId: productId,
      contentReview: review,
      pointProduct: value,
    };
    dispatch(postReview(userReview));
    alert("Calificación enviada");
  };

  return (
    <div className="lg:w-1/2 sm:w-full mx-auto lg:my-12 lg:shadow-lg lg:shadow-black lg:rounded-md">
      {isAuthenticated ? (
        <div>
          <div className="bg-ochre lg:rounded-t-md">
            <h2 className="text-xl sm:text-2xl lg:text-4xl text-center text-isabelline font-bold p-12">
              ¿Qué te pareció el producto?
            </h2>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className="p-4 lg:p-12">
            <span>¿Cuantas estrellas le darías a este producto?</span>
            <Stack spacing={1} className="mt-4">
              <Rating
                name="value"
                value={value}
                onChange={(event, newValue) => {
                  event.preventDefault();
                  setValue(newValue);
                }}
                size="large"
              />
            </Stack>
            <div className="flex flex-col mt-8">
              <span>
                Por favor, deja un comentario opinando del producto.<br></br>
                Será útil para futuros compradores.
              </span>
              <textarea
                name="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="h-40 mt-4 p-2 rounded-md border-2 border-slate-300 focus:outline-none resize-none "
              />
            </div>
            <button
              type="submit"
              className="mt-10 w-auto bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rorate:45"
            >
              Calificar
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full mx-auto my-24 p-12 rounded-lg bg-red-700">
          <h3 className="text-isabelline text-center text-2xl">Debes registrarte primero antes de calificar un producto</h3>
        </div>
      )}
    </div>
  );
}

export default SendReview;
