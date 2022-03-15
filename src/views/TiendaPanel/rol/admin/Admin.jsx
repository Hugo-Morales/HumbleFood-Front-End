import Button from "../../left/Button";
import { BiUserPlus } from "react-icons/bi";

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
		</>
	);
}
