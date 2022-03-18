import { MdCreate } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Button from "../../left/Button";

export default function Shop({ setId }) {
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
				div="flex bg-green-200 justify-center p-2 rounded-lg mt-3 hover:bg-sky-700 cursor-pointer"
				text="Crear Producto"
				buttonclass="flex items-center font-bold"
				icon={<MdCreate className="mr-2" />}
				f={() => setId("crear")}
			/>
			{/* Historial de Compras */}
			<Button
				div="flex bg-green-200 justify-center p-2 rounded-lg mt-3 hover:bg-sky-700 cursor-pointer"
				text="Compras"
				buttonclass="flex items-center font-bold"
				icon={<HiOutlineShoppingBag className="mr-2" />}
				f={() => setId("historial de compras")}
			/>
		</>
	);
}
