import React from "react";
import ButtonExit from "../../../components/buttonExit/buttonexit";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useAuth0 } from "@auth0/auth0-react";
import { postNewShop } from "../../../redux/actions";
// import Styles from "../../../img/bg-createShop.jpg";
const CreateShop = () => {
  // const { user } = useAuth0();
  // console.log(user);
  const dispatch = useDispatch();
  const [newShop, setNewShop] = useState({
    name: "",
    direction: "",
    description: "",
    image: "",
    userId: "",
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

  const handleformSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewShop(newShop));
    alert("Tienda registrada con exito!");
    setNewShop({
      name: "",
      direction: "",
      description: "",
      image: "",
    });
  };

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6 bg-create-shop">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Conviertete en Vendedor!
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Registra tu tienda y se parte la comunidad de vendedores de
              Humblefood.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={(e) => handleformSubmit(e)}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                {/* Nombre de la tienda */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
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
                  <label className="block text-sm font-medium text-gray-700">
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
                  <label className="block text-sm font-medium text-gray-700">
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
                  <label className="block text-sm font-medium text-gray-700">
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
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Registrar
                </button>
              </div>
            </div>
          </form>
        </div>
        <ButtonExit className />
      </div>
    </div>
  );
};

export default CreateShop;
