import Button from "../../left/Button";
import { BiEdit } from "react-icons/bi";

export default function User({ setId }) {
  return (
    <>
      {/* Historial de Compras */}
      <Button
        div="flex bg-green-200 justify-center p-2 rounded-lg mb-3 hover:bg-sky-700 cursor-pointer"
        text="Historial de compras"
        buttonclass="flex items-center font-bold"
        icon={<BiEdit className="mr-2" />}
        f={() => setId("historial")}
      />
    </>
  );
}
