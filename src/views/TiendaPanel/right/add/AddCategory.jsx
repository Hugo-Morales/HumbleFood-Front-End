import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	loading_panel,
	getallCategories,
	NewCategory,
} from "../../../../redux/actions";
import Loading from "../../../../components/loading/Loading";
import Swal from "sweetalert2";

export default function AddCategory() {
	const dispatch = useDispatch();
	const cargando = useSelector((state) => state.loadingPanel);
	const allcategories = useSelector((state) => state.allcategories);
	const [input, setInput] = useState("");
	const [errors, setErrors] = useState(null);
	const names = allcategories.map((c) => c.name);

	useEffect(() => {
		dispatch(loading_panel());
		dispatch(getallCategories());
	}, [dispatch]);

	function validate(input) {
		let errors = "";
		let regex = /[\W]/y;
		let notnumber = /[\d]/g;

		if (!input.trim() || !input) {
			errors = "El campo no puede estar vacío.";
		} else if (regex.test(input)) {
			errors = "No se permiten caractéres especiales.";
		} else if (notnumber.test(input)) {
			errors = "No se permiten números.";
		} else if (names.includes(input)) {
			errors = "No se pueden agregar las misma categoría.";
		} else if (input.length < 5) {
			errors = "Tiene que tener más de 5 letras.";
		} else if (input && !input.length < 5) {
			errors = "Ya podes agregar esta categoría.";
		}

		return errors;
	}

	const handleChange = (e) => {
		e.preventDefault();
		setInput(e.target.value);
		setErrors(validate(e.target.value));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (errors !== "Ya podes agregar esta categoría.") {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: errors,
			});
		} else {
			Swal.fire({
				title: "¿Estás seguro?",
				text: `¿Quieres agregar ${input} en categorías?`,
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				cancelButtonText: "Cancelar",
				confirmButtonText: "¡Sí, quiero!",
				reverseButtons: true,
			}).then((result) => {
				if (result.isConfirmed) {
					console.log(input);
					dispatch(NewCategory({ name: input }));
					setInput("");
					setErrors(null);
					dispatch(loading_panel());
					setTimeout(() => {
						dispatch(getallCategories());
					}, 500);
				}
			});
		}
	};

	return (
		<>
			{cargando ? (
				<div className="flex justify-center items-center bg-white">
					<Loading />
				</div>
			) : (
				<div className="min-h-full bg-white rounded-lg">
					<div className="p-2 text-center uppercase">
						<h1 className="font-bold">Crear Categoría</h1>
					</div>
					<div className="p-8">
						<form onSubmit={(e) => handleSubmit(e)}>
							<div className="mb-6">
								<label
									htmlFor="email"
									className="block mb-2 text-black font-bold"
								>
									Nombre de la categoría{" "}
									<p className="font-bold text-red-500">
										(Sólo se puede agregar una categoría al mismo tiempo.)
									</p>
								</label>
								<input
									type="text"
									id="text"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Ingrese la nueva categoría"
									value={input}
									onChange={(e) => handleChange(e)}
								/>
								{errors && (
									<p
										className={
											errors === "Ya podes agregar esta categoría."
												? "text-green-500 font-bold py-1 px-2"
												: "text-red-500 font-bold py-1 px-2"
										}
									>
										{errors}
									</p>
								)}
							</div>
							<div className="mb-6">
								<label
									htmlFor="categories"
									className="block mb-2 text-black font-bold"
								>
									Todas las categorías
								</label>
								<select
									id="categories"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								>
									{allcategories?.map((c, index) => (
										<option key={index}>{c.name}</option>
									))}
								</select>
							</div>
							<button
								type="submit"
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Agregar Categoría
							</button>
						</form>
					</div>
				</div>
			)}
		</>
	);
}
