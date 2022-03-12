import Button from "../../left/Button";
import { BiUserPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

export default function Admin({ setId }) {
    return (
        <div>
            <Button
                div="flex bg-green-200 justify-center p-2 rounded-lg mt-3 hover:bg-sky-700 cursor-pointer"
                text="Hacer Admin"
                buttonClass="flex items-center font-bold"
                icon={<BiUserPlus className="mr-2" />}
                f={() => setId("makeAdmin")}
            />
            <Button
                div="flex bg-green-200 justify-center p-2 rounded-lg mt-3 hover:bg-sky-700 cursor-pointer"
                text="Borrar Producto"
                buttonClass="flex items-center font-bold"
                icon={<MdDelete className="mr-2" />}
            // f={() => setId("crear")}
            />
        </div>
    )
}