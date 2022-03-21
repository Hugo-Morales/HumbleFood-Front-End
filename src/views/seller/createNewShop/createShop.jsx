import React from "react";
import ButtonExit from "../../../components/buttonExit/buttonexit";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewShop, getdataUser } from "../../../redux/actions";
import Loading from "../../../components/loading/Loading";
import Styles from "./createShop.module.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const CreateShop = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataUser = useSelector((state) => state.dataUser);
  const id = dataUser?.userId;
  const [loading, setloading] = useState(true);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 300);
    dispatch(getdataUser(user?.sub.split("|")[1]));
  }, [dispatch, user]);

  // console.log(dataUser);

  const [newShop, setNewShop] = useState({
    name: "",
    direction: "",
    description: "",
    image: "",
    userId: dataUser?.id,
    email: "",
  });

  const handleInputChange = (e) => {
    setNewShop({
      ...newShop,
      [e.target.name]: e.target.value,
    });
  };

  const handleUploadImg = (element) => {
    const file = element.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      setNewShop({ ...newShop, image: reader.result });
    };
    reader.readAsDataURL(file); //transforma la imagen a b64 (string), y asi lo puede leer
  };

  // console.log(newShop);

  // console.log(newShop);
  const handleformSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewShop(newShop));
    // alert("Tienda registrada con exito!");
    MySwal.fire({
      position: "center",
      icon: "success",
      title: "Tu tienda ha sido registrada con exito",
      showConfirmButton: false,
      timer: 2000,
    });
    navigate(`/settings/${id}`);
    setNewShop({
      name: "",
      direction: "",
      description: "",
      image: "",
      userId: "",
      email: "",
    });
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={`${"h-screen"} ${Styles.bg}`}>
          <div className={` ${"md:grid md:grid-cols-3 md:gap-6"}`}>
            <div className="h-fit  pt-3 pr-1 rounded-md pb-3 pl-3 mt-4 bg-orange-300 md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg  leading-6 text-gray-900 font-bold">
                  Conviertete en Vendedor!
                </h3>
                <p className="mt-1 text-sm text-white-700 font-bold">
                  Registra tu tienda y se parte la comunidad de vendedores de
                  Humblefood.
                </p>
              </div>
            </div>
            <div className="my-5 md:mt-4 md:col-span2">
              <form onSubmit={(e) => handleformSubmit(e)}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-gray-200 space-y-6 sm:p-6">
                    {/* Nombre de la tienda */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label className="font-bold block text-sm  text-gray-700">
                          {" "}
                          Nombre de la tienda:{" "}
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            name="name"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="Ej: Panaderia Rosalba"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Direccion */}
                    <div>
                      <label className="font-bold block text-sm  text-gray-700">
                        Direccion de la tienda:{" "}
                      </label>
                      <div className="mt-1">
                        <textarea
                          onChange={(e) => handleInputChange(e)}
                          name="direction"
                          rows="3"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Ej: La Urbina calle 3A"
                        ></textarea>
                      </div>
                      <div className="mt-5 flex justify-around font-bold">
                        <p> Verificar direccion con google maps: </p>
                        <Link to="/createShop/map">
                          <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-map-2"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="#00b341"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <line x1="18" y1="6" x2="18" y2="6.01" />
                              <path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5" />
                              <polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15" />
                              <line x1="9" y1="4" x2="9" y2="17" />
                              <line x1="15" y1="15" x2="15" y2="20" />
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>

                    {/* Descripcion */}
                    <div>
                      <label className="font-bold block text-sm  text-gray-700">
                        Descripcion de la tienda:{" "}
                      </label>
                      <div className="mt-1">
                        <textarea
                          onChange={(e) => handleInputChange(e)}
                          name="description"
                          rows="2"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Ej: Panadaria y pasteleria con mas de 20 años de experiencia en el mercado..."
                        ></textarea>
                      </div>
                    </div>

                    {/* Correo asociado al paypal*/}

                    <div className="col-span-3 sm:col-span-2">
                      <label className="font-bold block text-sm  text-gray-700">
                        {" "}
                        Correo de la tienda Asociado a Paypal:{" "}
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          onChange={(e) => handleInputChange(e)}
                          type="email"
                          name="email"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="Ej: tienda123@gmail.com"
                        />
                      </div>
                    </div>
                    {/* Foto */}
                    <div>
                      <label className="font-bold block text-sm  text-gray-700">
                        {" "}
                        Foto de la tienda:{" "}
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-0 pb-0 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          {!newShop.image ? (
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            "Archivo cargado exitosamente."
                          )}

                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                              <span>Cargar una imagen</span>

                              <input
                                type="file"
                                className="sr-only"
                                onChange={handleUploadImg}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF hasta 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between px-4 py-1.5 bg-gray-200 text-right sm:px-6">
                    <ButtonExit
                      text="Volver al panel de usuario"
                      ruta={`/settings/${id}`}
                      className="mt-4 bg-red-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full"
                    />
                    <button
                      type="submit"
                      className="mt-4 bg-red-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Registrar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateShop;
