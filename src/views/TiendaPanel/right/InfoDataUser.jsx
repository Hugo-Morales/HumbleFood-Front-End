import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { getnameOfShop } from "../../../redux/actions";
import { useSelector } from "react-redux";

const InfoDataUser = ({ dataUser }) => {
  const { user } = useAuth0();
  // console.log(user, "user");
  // console.log(dataUser, "dataUser");

  const nameOfShop = useSelector((state) => state.nameOfShop);
  // console.log(nameOfShop);

  const dispatch = useDispatch();
  useEffect(() => {
    if (dataUser.rol === 1) {
      dispatch(getnameOfShop(dataUser?.shopsId[0]));
    }
  });
  // console.log(dataUser);
  return (
    <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-1 ml-40">
      <div className="flex justify-center md:justify-end -mt-16">
        <img
          className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
          src={user?.picture}
          alt="none"
        />
      </div>
      <div className="font-bold">
        <h2 className="text-gray-800 text-3xl font-semibold">
          Informacion de la cuenta:
        </h2>
        <h3>
          Correo asociado: <span className="text-lime-500">{user?.email}</span>
        </h3>
        <h3>
          Nombre completo:{" "}
          <span className="text-lime-500">{dataUser?.name}</span>
        </h3>
        <h3>
          Nombre de usuario:{" "}
          <span className="text-lime-500">{dataUser?.name_user}</span>
        </h3>
        <h3>
          Tipo de cuenta:{" "}
          {dataUser?.rol === 2 ? (
            <span className="text-lime-500">Admin Master</span>
          ) : dataUser?.rol === 0 ? (
            <span className="text-lime-500">Cliente Comprador</span>
          ) : (
            <span className="text-lime-500">Cliente Vendedor</span>
          )}
        </h3>
        {dataUser?.rol === 1 ? (
          <h3>
            Tienda asociada: <span className="text-lime-500">{nameOfShop}</span>
          </h3>
        ) : null}
        {/* <p className="mt-2 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
          deserunt ea doloremque natus error, rerum quas odio quaerat nam ex
          commodi hic, suscipit in a veritatis pariatur minus consequuntur!
        </p> */}
      </div>
      <div className="flex justify-end mt-4">
        <a href="!#" className="text-xl font-medium text-indigo-500">
          Que gusto verte de nuevo {dataUser?.name_user}!
        </a>
      </div>
    </div>
  );
};

export default InfoDataUser;
