import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemsTable from "./ItemsTable";
import Loading from "../../../../components/loading/Loading";
import { loading_panel, stop } from "../../../../redux/actions";

export default function ShowsItems() {
	const dispatch = useDispatch();
	const items = JSON.parse(localStorage.getItem("carrito"));
	const cargando = useSelector((state) => state.loadingPanel);

	useEffect(() => {
		dispatch(loading_panel());
		setTimeout(() => {
			dispatch(stop());
		}, 500);
	}, [dispatch]);

	const borrar = (id) => {
		// console.log(id);
		const index = items.findIndex((e) => e.name === id);
		items.splice(index, 1);
		// const newArray = ;

		localStorage.setItem("carrito", JSON.stringify(items));

		dispatch(loading_panel());
		setTimeout(() => {
			dispatch(stop());
		}, 500);
	};

	return (
		<>
			{cargando ? (
				<div className="flex justify-center items-center bg-white">
					<Loading />
				</div>
			) : (
				<div className="bg-white rounded-lg">
					<h1 className="font-bold text-center border-b-indigo-500 border-b-4">
						Items Guardados en el Carrito
					</h1>
					{items?.length ? (
						<ItemsTable datos={items} borrar={borrar} />
					) : (
						<div className="text-center font-bold p-4 text-red-400">
							<h1>No tenes ningún producto guardado el en carrito</h1>
						</div>
					)}
				</div>
			)}
		</>
	);
}
