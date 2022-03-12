import Table from "./Table";
import CreateProducts from "./Create/CreateProducts";
import HacerAdmin from "./make/HacerAdmin";
import Styles from "./SideRight.module.css";

export default function SideRight({
	product,
	idS,
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
			case "delete":
				return (
					<Table
						p={products}
						d={true}
						next={next}
						prev={prev}
						pagesTotal={pagesTotal}
						paging={paging}
						currentPage={currentPage}
					/>
				);
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
