import { MdCreate } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { BsShopWindow } from "react-icons/bs";
import Button from "../../left/Button";
import { Link } from "react-router-dom";

export default function Shop({ setId, shopsId }) {
	return (
		<>
			{/* Estado de ordenes */}
			<Button
				div="flex bg-green-200 justify-center p-2 rounded-lg mt-3 hover:bg-sky-700 cursor-pointer"
				text="Estado de ordenes"
				buttonclass="flex items-center font-bold"
				icon={<BiEdit className="mr-2" />}
				f={() => setId("modificar ordenes")}
			/>

			{/* Crear Producto */}
			<Button
				div="flex bg-green-200 items-center font-bold justify-center p-2 rounded-lg mt-3 hover:bg-sky-700 cursor-pointer"
				text="Crear Producto"
				buttonclass="flex items-center font-bold"
				icon={<MdCreate className="mr-2" />}
				f={() => setId("crear")}
			/>

			{/* Ver mi Tienda */}
			<Link
				to={`/productShop/${shopsId}`}
				className="flex bg-green-200 items-center font-bold justify-center p-2 rounded-lg mt-3 hover:bg-sky-700 cursor-pointer"
			>
				<BsShopWindow className="mr-2" />
				Ver mi Tienda
			</Link>
		</>
	);
}
