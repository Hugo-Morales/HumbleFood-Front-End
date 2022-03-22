import Button from "../../left/Button";
import { BiUserPlus } from "react-icons/bi";
import { MdAddCircleOutline } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";

export default function Admin({ setId }) {
	return (
		<>
			<Button
				div="flex bg-green-200 justify-center p-2 rounded-lg mt-3 hover:bg-sky-700 cursor-pointer"
				text="Hacer Admin"
				buttonclass="flex items-center font-bold"
				icon={<BiUserPlus className="mr-2" />}
				f={() => setId("makeAdmin")}
			/>

			<Button
				div="flex bg-green-200 justify-center p-2 rounded-lg mt-3 hover:bg-sky-700 cursor-pointer"
				text="Crear Categoría"
				buttonclass="flex items-center font-bold"
				icon={<MdAddCircleOutline className="mr-2" />}
				f={() => setId("addCategory")}
			/>

			<Button
				div="flex bg-green-200 justify-center p-2 rounded-lg mt-3 hover:bg-sky-700 cursor-pointer"
				text="Solicitudes"
				buttonclass="flex items-center font-bold"
				icon={<BsCart4 className="mr-2" />}
				f={() => setId("approve")}
			/>
		</>
	);
}
