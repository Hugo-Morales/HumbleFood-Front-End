import React from "react";
import ButtonExit from "../../../components/buttonExit/buttonexit";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewShop, getdataUser } from "../../../redux/actions";
import Loading from '../../../components/loading/Loading';
import Styles from "./createShop.module.css";

const CreateShop = ({ user }) => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.dataUser);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloading(false)
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
  const handleformSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewShop(newShop));
    alert("Tienda registrada con exito!");
    setNewShop({
      name: "",
      direction: "",
      description: "",
      image: "",
      userId: "",
    });
  };

  return (
    <>
      {
        loading ? (<Loading />) : (
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
                            rows="3"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="Ej: Panadaria y pasteleria con mas de 20 años de experiencia en el mercado..."
                          ></textarea>
                        </div>
                      </div>
                      {/* Foto */}
                      <div>
                        <label className="font-bold block text-sm  text-gray-700">
                          {" "}
                          Foto de la tienda:{" "}
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                      <ButtonExit />
                      <button
                        type="submit"
                        className="  px-2 border border-transparent shadow-sm text-sm rounded-md text-white font-bold bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Registrar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      }
    </>

  );
};

export default CreateShop;
