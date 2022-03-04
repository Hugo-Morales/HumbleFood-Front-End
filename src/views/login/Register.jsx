import React from "react";
import { useParams } from "react-router-dom";
import InputForm from "../../components/inputForm/InputForm";
import { useState } from "react";
import { useDispatch } from "react-redux";

function Register() {
  const dispatch = useDispatch();
  const [user, setuser] = useState({
    name: "",
    name_user: "",
    email: "",
    direction: "",
    image: "",
    description: "",
    rol: "",
  });

  // const handleInputChange = (e) => {
  //   setuser({
  //     ...user,
  //     [e.target.name]: e.target.value,
  //   });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (user.rol === "buyer") {
  //     const data = {
  //       name: user.name,
  //       name_user: user.name_user,
  //       email: user.email,
  //       direction: user.direction,
  //       rol: user.rol,
  //     };
  //   } else if (user.rol === "seller") {
  //     const data = {
  //       name: user.name,
  //       email: user.email,
  //       direction: user.direction,
  //       image: user.image,
  //       description: user.description,
  //       rol: user.rol,
  //     };
  //   }
  //   // dispatch(actionCreator(data));
  //   setuser({
  //     name: "",
  //     name_user: "",
  //     email: "",
  //     direction: "",
  //     image: "",
  //     description: "",
  //     rol: "",
  //   });
  // };

  const { type } = useParams();

  return (
    <div className="h-screen bg-gradient-to-tl from-princetonOrange to-isabelline w-full px-4">
      <div className="flex flex-col items-center justify-center font-poppins">
        <div className="mt-8 text-2xl text-center font-extrabold">
          <h3>
            Bienvenido<br></br>
            Únase a la comunidad como
            {type === "buyer" ? <p>Comprador</p> : <p>Vendedor</p>}
          </h3>
        </div>
        <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full px-10 pb-6 mt-8">
          {type === "buyer" ? (
            <button
              aria-label="Continue with google"
              className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
            >
              <svg
                width="19"
                height="20"
                viewBox="0 0 19 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                  fill="#4285F4"
                />
                <path
                  d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                  fill="#34A853"
                />
                <path
                  d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
                  fill="#FBBC05"
                />
                <path
                  d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
                  fill="#EB4335"
                />
              </svg>
              <p className="text-base font-bold ml-4 text-gray-700">
                Continuar con Google
              </p>
            </button>
          ) : (
            <span></span>
          )}

          <div className="w-full flex items-center justify-between py-5">
            <hr className="w-1/4 bg-gray-400"></hr>
            {type === "buyer" ? (
              <span className="flex justify-center items-center w-full text-base font-medium leading-4 px-2.5 text-gray-400">
                O usa tu email
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-user"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#ff4500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="7" r="4" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </span>
            ) : (
              <span className="flex justify-center items-center w-full text-base font-medium leading-4 px-2.5 text-gray-400">
                Datos de la Tienda
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-building-store"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#ff4500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="3" y1="21" x2="21" y2="21" />
                  <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
                  <line x1="5" y1="21" x2="5" y2="10.85" />
                  <line x1="19" y1="21" x2="19" y2="10.85" />
                  <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
                </svg>
              </span>
            )}
            <hr className="w-1/4 bg-gray-400"></hr>
          </div>
          <InputForm type={type} />
          <div className="mt-8">
            <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
              Crear cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
