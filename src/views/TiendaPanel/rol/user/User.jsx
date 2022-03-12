import Button from "../../left/Button";
import { BiEdit } from "react-icons/bi";

export default function User({ setId }) {
  return (
    <>
      {/* Crear Producto */}
      <Button
        div="flex bg-green-200 justify-center p-2 rounded-lg mt-3 mb-3 hover:bg-sky-700 cursor-pointer"
        text="Historial de compra"
        buttonclassName="flex items-center font-bold"
        icon={<BiEdit className="mr-2" />}
        f={() => setId("crear")}
      />
    </>
<<<<<<< HEAD
  )

=======
  );
>>>>>>> 4fda090dcde395ab44ad3c62a3d10a0b490da2c6
}
