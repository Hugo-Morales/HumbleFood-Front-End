import { useState } from "react";
import { useDispatch } from "react-redux";
import { editProduct } from "../../redux/actions";

export default function Edit({ setShowEdit, info }) {
	const dispatch = useDispatch();

	const [input, setInput] = useState({
		nombre: "",
		description: "",
		discount: "",
		price: "",
		stock: "",
		categories: info.categories,
	});

	const c = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	};

	const submit = (e) => {
		e.preventDefault();

		const obj = {
			idProduct: info.id,
			name: !!input.nombre ? input.nombre : info.name,
			image: info.image,
			description: !!input.description ? input.description : info.description,
			price: !!input.price ? Number(input.price).toFixed(2) : info.price,
			discount: !!input.discount ? Number(input.discount) : info.discount,
			stock: !!input.stock ? Number(input.stock) : info.stock,
			categories: input.categories.toString(),
		};
		console.log(obj);
		dispatch(editProduct(obj));
		setShowEdit(false);
	};

	return (
		<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
			<div className="relative w-auto my-6 mx-auto max-w-3xl">
				<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
					<div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
						<h3 className="text-3xl font=semibold">Editar Producto</h3>
						<button
							className="bg-transparent border-0 text-black float-right"
							onClick={() => setShowEdit(false)}
						>
							<span className="flex justify-center items-center text-black opacity-7 h-6 w-6 text-xl bg-gray-400 py-0 rounded-full hover:bg-red-500">
								x
							</span>
						</button>
					</div>
					<div className="relative p-6 flex-auto">
						<form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
							<label className="block text-black text-sm font-bold mb-1">
								Nombre del Producto
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
								placeholder={info.name}
								name="nombre"
								value={input.nombre}
								onChange={c}
							/>
							<label className="block text-black text-sm font-bold mb-1">
								Descripción
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
								placeholder={info.description}
								name="description"
								value={input.description}
								onChange={c}
							/>
							<label className="block text-black text-sm font-bold mb-1">
								Precio
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
								placeholder={"$" + info.price}
								name="price"
								value={input.price}
								onChange={c}
							/>
							<label className="block text-black text-sm font-bold mb-1">
								Descuento
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
								placeholder={info.discount + "%"}
								name="discount"
								value={input.discount}
								onChange={c}
							/>
							<label className="block text-black text-sm font-bold mb-1">
								Stock
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
								placeholder={info.stock}
								name="stock"
								value={input.stock}
								onChange={c}
							/>
							<label className="block text-black text-sm font-bold mb-1">
								Categorías (usa ',' por categoría)
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
								placeholder={info.categories}
								name="categories"
								value={input.categories}
								onChange={c}
							/>
						</form>
					</div>
					<div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
						<button
							className="text-white bg-red-500 active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
							type="button"
							onClick={() => setShowEdit(false)}
						>
							Cerrar
						</button>
						<button
							className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
							type="button"
							onClick={submit}
						>
							Editar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
