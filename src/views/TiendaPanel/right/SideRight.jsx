import Table from "./Table";
import CreateProducts from "./Create/CreateProducts";
import HacerAdmin from "./make/HacerAdmin";
import Styles from "./SideRight.module.css";
import Orders from "./Orders/Orders";
import ShoppingHistory from "./ShoppingHistory/ShoppingHistory";

export default function SideRight({
	product,
	idS,
	userId,
	shopsId,
	paging,
	currentPage,
}) {
	const { products, next, prev, pagesTotal } = product;
	// console.log(products);

	const renderSwitch = (x) => {
		switch (x) {
			case "home":
				return (
					<Table
						p={products}
						d={false}
						next={next}
						prev={prev}
						pagesTotal={pagesTotal}
						paging={paging}
						currentPage={currentPage}
					/>
				);
			case "crear":
				return <CreateProducts shopId={shopsId} />;
			case "modificar ordenes":
				return <Orders shopId={shopsId} />;
			case "historial de compras":
				return <ShoppingHistory userId={userId} />;
			case "makeAdmin":
				return <HacerAdmin />;
			default:
				return (
					<Table
						p={products}
						d={false}
						next={next}
						prev={prev}
						pagesTotal={pagesTotal}
						paging={paging}
						currentPage={currentPage}
					/>
				);
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
