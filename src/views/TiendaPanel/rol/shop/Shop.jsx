import { MdCreate, MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import Button from "../../left/Button";

export default function Shop({ setId }) {
  return (
    <>
      {/* Estado de ordenes */}
      <Button
        div="flex bg-green-200 justify-center p-2 rounded-lg mt-3 hover:bg-sky-700 cursor-pointer"
        text="Estado de ordenes"
        buttonclassName="flex items-center font-bold"
        icon={<BiEdit className="mr-2" />}
        f={() => setId("modificar ordenes")}
      />

      {/* Crear Producto */}
      <Button
        div="flex bg-green-200 justify-center p-2 rounded-lg mt-3 hover:bg-sky-700 cursor-pointer"
        text="Crear Producto"
        buttonclassName="flex items-center font-bold"
        icon={<MdCreate className="mr-2" />}
        f={() => setId("crear")}
      />
    </>
  );
}
