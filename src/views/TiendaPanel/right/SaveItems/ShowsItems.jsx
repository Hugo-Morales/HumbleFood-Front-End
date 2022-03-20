import ItemsTable from "./ItemsTable";

export default function ShowsItems() {
	const items = JSON.parse(localStorage.getItem("carrito"));

	const borrar = (id) => {
		const index = items.indexOf(id);

		if (index === -1) {
			items.splice(index, 1);
			localStorage.setItem("carrito", JSON.stringify(items));
		}
	};

	return (
		<>
			<div className="bg-white rounded-lg">
				<h1 className="font-bold text-center border-b-indigo-500 border-b-4">
					Items Guardados en el Carrito
				</h1>
				{items.length ? (
					<ItemsTable datos={items} borrar={borrar} />
				) : (
					<>Tiene algo</>
				)}
			</div>
		</>
	);
}
