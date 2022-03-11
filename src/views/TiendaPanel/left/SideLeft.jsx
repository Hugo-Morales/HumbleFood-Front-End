import { Link } from 'react-router-dom'
import { AiOutlineLogout } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import User from '../rol/user/User';
import Shop from '../rol/shop/Shop'
import Button from "./Button";
import Admin from '../rol/admin/Admin'

export default function SideLeft({ name, setId, rol, shopsId }) {
  const { logout } = useAuth0();
  // console.log(rol, shopsId)

  return (
    <div className="bg-gray-700 overflow-y-auto h-full p-6">
      <div className="p-2 mb-5 text-white uppercase">
        <h1>Bienvenido {name}</h1>
      </div>
      <div className="text-center bg-white p-2 rounded-lg mb-10 cursor-pointer" onClick={() => setId("home")}>
        <h1>{rol === 2 ? (<>Panel de Admin</>) : (<>Panel de Control</>)}</h1>
      </div>
      {/* <div>
                Mensajes (Opcional)
                - Responder Mensajes
                - Editar Mensajes
                - Borrar Mensajes
                Configuración de Perfil (Opcional)
                Productos,
                - Crear
                - Modificar
                - Borrar
                Filtrar Ordenes por Estado
                . Completa
                . Cancelada
                . Procesada
                . Creada
            </div> */}
      <div>
        <h1 className="text-white uppercase">Opciones</h1>
        <hr></hr>
        {
          rol === 0 && shopsId.length === 0 ? (
            <>
              {/* Agregar otra Tienda */}
              <Link to='/createShop'>
                <Button
                  div="flex bg-green-200 justify-center p-2 rounded-lg mb-10 mt-3 hover:bg-sky-700 cursor-pointer"
                  text="Registrar Tienda"
                  buttonclassName="flex items-center font-bold"
                  icon={<GrAddCircle className="mr-2" />}
                />
              </Link>
            </>
          ) : (null)
        }

        {
          rol === 2 ? (
            <>
              <Admin setId={setId} />
            </>) :
            rol === 1 ? (
              <>
                <Shop setId={setId} />
              </>
            ) :
              rol === 0 ? (
                <>
                  <User setId={setId} />
                </>
              ) : (null)
        }
        {
          rol === 1 || rol === 0 ? (<>
            {/* Mensajes */}
            <Button
              div="flex bg-green-300 justify-center p-2 rounded-lg items-center hover:bg-sky-700 cursor-pointer"
              text="Mensajes"
              buttonClass="flex items-center justify-center font-bold"
              icon={<BiMessageRoundedDetail className="mr-2" />}
              f={() => alert("Perfil")}
              m={3}
              mstyles="ml-2 rounded-full bg-red-500 px-1"
            />
            {/* Configurar Perfil */}
            <Button
              div="flex bg-green-300 justify-center p-2 rounded-lg mt-8 items-center hover:bg-sky-700 cursor-pointer"
              text="Configurar Perfil"
              buttonClass="flex items-center font-bold"
              icon={<FiSettings className="mr-2" />}
              f={() => alert("Perfil")}
            />
          </>) : (null)
        }
        {/* Cerrar Sesión */}
        <Button
          div="flex bg-red-600 justify-center p-2 rounded-lg mt-9 items-center cursor-pointer"
          text="Cerrar Sesión"
          buttonclassName="flex items-center font-bold"
          icon={<AiOutlineLogout className="mr-2" />}
          f={() => logout({ returnTo: window.location.origin })}
        />
      </div>
    </div>
  );
}
