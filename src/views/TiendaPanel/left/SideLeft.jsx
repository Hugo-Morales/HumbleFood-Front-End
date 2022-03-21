import { Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { GrAddCircle, GrConfigure } from "react-icons/gr";
import { useAuth0 } from "@auth0/auth0-react";
import User from "../rol/user/User";
import Shop from "../rol/shop/Shop";
import Button from "./Button";
import Admin from "../rol/admin/Admin";
import ButtonExit from "../../../components/buttonExit/buttonexit";

export default function SideLeft({ name, setId, rol, shopsId }) {
	const { logout } = useAuth0();
	// console.log(rol, shopsId)

	return (
		<div className="bg-gray-700 sticky top-0 sm-h-30 h-screen p-6">
			<ButtonExit
				text="Volver a ver tiendas"
				ruta="/home"
				className="mt-1  mb-6 ml-10 mr-0 bg-red-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full"
			/>
			<div className="p-2 mb-5 text-white uppercase">
				<h1>Bienvenido {name}</h1>
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
				<div
					className="text-center bg-green-200 p-2 rounded-lg hover:bg-sky-700 cursor-pointer mt-2"
					onClick={() => setId("home")}
				>
					<h1 className="flex justify-center items-center font-bold">
						<GrConfigure className="mr-2" />
						{rol === 2 ? <>Panel de Admin</> : <>Panel de Control</>}
					</h1>
				</div>
				{rol === 0 && shopsId.length === 0 ? (
					<>
						{/* Agregar otra Tienda */}
						<Link to="/createShop">
							<Button
								div="flex bg-green-200 justify-center p-2 rounded-lg mb-10 mt-3 hover:bg-sky-700 cursor-pointer"
								text="Registrar Tienda"
								buttonclass="flex items-center font-bold"
								icon={<GrAddCircle className="mr-2" />}
							/>
						</Link>
					</>
				) : null}

				{rol === 2 ? (
					<Admin setId={setId} />
				) : rol === 1 ? (
					<Shop setId={setId} />
				) : rol === 0 ? (
					<User setId={setId} />
				) : null}

				{/* Cerrar Sesión */}
				<Button
					div="flex bg-red-600 justify-center p-2 rounded-lg mt-9 items-center cursor-pointer"
					text="Cerrar Sesión"
					buttonclass="flex items-center font-bold"
					icon={<AiOutlineLogout className="mr-2" />}
					f={() => logout({ returnTo: window.location.origin })}
				/>
			</div>
		</div>
	);
}
