import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, getallCategories } from "../../redux/actions";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

export default function Edit({ setShowEdit, info }) {
	const dispatch = useDispatch();
	const [input, setInput] = useState({
		nombre: "",
		description: "",
		discount: "",
		price: "",
		stock: "",
		categoriesId: [],
	});
	const [listCategories, setListCategories] = useState([])
	const categories = useSelector(state => state.allcategories);
	useEffect(() => {
		dispatch(getallCategories());
		console.log(info);
	},[])
	
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
			categoriesId: input.categoriesId.length? input.categoriesId.toString(): info.categoriesId.toString(),
		};
		//console.log(obj);
		dispatch(editProduct(obj));
		setShowEdit(false);
    Swal.fire({
      title: "Se han actualizado los cambios",
      icon: "success",
      confirmButtonText: "OK",
      backdrop: `
			rgba(0,0,123,0.4)
			left top
			no-repeat
		  `,
    }).then((r) => {
      if (r.isConfirmed) {
        window.location.reload(false);
      }
    });
	};

	const handleSelect = (e) => {
		e.preventDefault();
		const {value, name} = e.target;
		if(name !== "default"){
			if(!input.categoriesId.find(n => n === value)){
				categories.forEach(e => {
					if(e.id === value){
						setListCategories([...listCategories, e.name])
					}
				});
				setInput({
					...input,
					categoriesId: [...input.categoriesId, value],
				});
			}
		}
		e.target.value = "default";
	}
  console.log("listCategories", listCategories);

	const eliminar = (e,name) =>{
		e.preventDefault();
		Swal.fire({
			title: "¿Estás seguro?",
			text: "Esta acción no se puede revertir.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Cancelar",
			confirmButtonText: "¡Sí, quiero!",
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire(
					"¡Categoría Borrada!",
					"La categoría fue removida de la lista.",
					"success"
				);
				if(listCategories.find(c => c === name)){
          let pos = listCategories.findIndex((e) => e === name);
          let cat = input.categoriesId.filter((e, index) => index !== pos)
          setInput({
            ...input,
            categoriesId: cat,
          });
					let categori = listCategories.filter((c) => c !== name);
					setListCategories(categori);
				}
			}
		});
	}
	return (
		<div className="">
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
							{/* <input
								className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
								placeholder={info.categories}
								name="categories"
								value={input.categories}
								onChange={c}
							/> */}
							<select className="shadow appearance-none border rounded w-full py-2 px-1 text-black" onChange={(e) => handleSelect(e)}>
								<option value="default" selected disabled>Seleccione una categoría para el producto.</option>
								{
									categories?.map((c, index )=> {
										return <option key={index} value={c.id}>{c.name}</option>
									})
								}
							</select>
							{
											listCategories?.map((c, index) => {
															return (
																<div key={index} className="flex justify-between">
																	<label className="">{c}</label>
																	<button className="" name="eliminar" onClick={(e) => eliminar(e,c)}>
																		<MdDelete className="text-red-600" />
																	</button>
																</div>
															);
														})

										}
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
							onClick={(e) => submit(e)}
						>
							Confirmar cambios
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
