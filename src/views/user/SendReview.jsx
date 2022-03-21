import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { getdataUser, postReview } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function SendReview() {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const dispatch = useDispatch();
  const id = useParams();
  const [productId, setProductId] = useState("");
  const [value, setValue] = useState(0);
  const [review, setReview] = useState("");

  console.log("review", id);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const getProductId = async () => {
      try {
        setProductId(id.productId);
      } catch (error) {
        console.log(error);
      }
    };
    getProductId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userReview = {
      userId: user?.sub.split("|")[1],
      productId: productId,
      contentReview: review,
      pointProduct: value,
    };
    dispatch(postReview(userReview));
    MySwal.fire({
      title: "Gracias por dejarnos tu opinión",
      icon: "success",
      confirmButtonText: "OK",
      backdrop: `
      rgba(0,0,123,0.4)
      left top
      no-repeat
    `,
    });
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
            <div className="w-full flex justify-between">
              <button
                type="submit"
                className="mt-10 w-auto bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rorate:45"
              >
                Calificar
              </button>
              <Link
                to={`/settings/${user?.sub.split("|")[1]}`}
                className="mt-10 w-auto bg-princetonOrange border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rorate:45"
              >
                Volver
              </Link>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center mx-auto my-24 p-12 rounded-md bg-red-700">
          <h3 className="text-isabelline text-center text-2xl mb-8">
            Debes registrarte primero antes de calificar un producto
          </h3>
          <button
            onClick={() => loginWithRedirect()}
            className="flex items-center justify-center max-w-max mr-3 px-4 py-2 space-x-3 text-sm text-center bg-darkGreen text-isabelline transition-colors duration-200 transform dark:text-gray-300 dark:border-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-user-circle"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="10" r="3" />
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
            </svg>
            <span className="text-sm text-white dark:text-gray-200">
              Iniciar / Crear Cuenta
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default SendReview;
