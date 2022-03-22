import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "./Card";
import PaginationControlled from "../../views/TiendaPanel/right/pagination";
import Loading from "../loading/Loading";
import { loading_panel, getProductShop } from "../../redux/actions";

const Cards = ({
	handleAddToCart,
	products,
	shop,
	currentPage,
	paging,
	pagesTotal,
}) => {
	const { shopId } = useParams();
	const dispatch = useDispatch();
	const cargando = useSelector((state) => state.loadingPanel);

	useEffect(() => {
		dispatch(loading_panel());
		dispatch(getProductShop(shopId, currentPage));
	}, [dispatch, currentPage, shopId]);

	return (
		<>
			{cargando ? (
				<Loading />
			) : (
				<>
					<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mobile:mt-12 md:mt-5 mobile:px-auto mobile:ml-4 md:mx-auto pb-8">
						{products &&
							products?.map((product, index) => {
								if (product.stock > 0) {
									return (
										<div key={index} className="">
											<Card
												handleAddToCart={handleAddToCart}
												product={product}
												shop={shop}
											/>
										</div>
									);
								}

								return null;
							})}
					</div>
					{products && (
						<PaginationControlled
							paging={paging}
							currentPage={currentPage}
							pagesTotal={pagesTotal}
						/>
					)}
				</>
			)}
		</>
	);
};

export default Cards;
