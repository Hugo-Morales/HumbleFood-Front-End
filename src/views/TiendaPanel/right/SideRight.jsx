import Table from "./Table";
import CreateProducts from "./Create/CreateProducts";
import HacerAdmin from "./make/HacerAdmin";
import Styles from "./SideRight.module.css";
import Orders from "./Orders/Orders";
import ShoppingHistory from "./ShoppingHistory/ShoppingHistory";
import ShowsItems from "./SaveItems/ShowsItems";

export default function SideRight({
	product,
	idS,
	userId,
	rol,
	shopsId,
	paging,
	currentPage,
}) {
	const { products, pagesTotal } = product;
	// console.log(products);

	const renderSwitch = (x) => {
		switch (x) {
			case "home":
				if (rol === 0) {
					return <ShowsItems />;
				} else {
					return (
						<Table
							p={products}
							d={false}
							pagesTotal={pagesTotal}
							paging={paging}
							currentPage={currentPage}
						/>
					);
				}
			case "crear":
				return <CreateProducts shopId={shopsId} />;
			case "modificar ordenes":
				return <Orders shopId={shopsId} />;
			case "makeAdmin":
				return <HacerAdmin />;
			case "historial":
				return <ShoppingHistory userId={userId} />;
			default:
				if (rol === 0) {
					return <ShowsItems />;
				} else {
					return (
						<Table
							p={products}
							d={false}
							pagesTotal={pagesTotal}
							paging={paging}
							currentPage={currentPage}
						/>
					);
				}
		}
	};

	return (
		<div className="bg-gray-700 h-full p-6">
			<div className={`${Styles.bg} ${"h-full p-6 sm:rounded-lg"}`}>
				{renderSwitch(idS)}
			</div>
		</div>
	);
}
