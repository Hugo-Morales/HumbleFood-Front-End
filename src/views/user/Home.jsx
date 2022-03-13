import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductShop, getShopsId, loading } from "../../redux/actions";
import Nav from "../../components/nav/Nav";
import Cards from "../../components/cards/Cards";
import Loading from "../../components/loading/Loading";
import Paginado from "../../components/paginado/Paginado";

const Home = ({
	cartItems,
	setCartItems,
	getTotalItems,
	handleAddToCart,
	handleRemoveFromCart,
	handleDeleteFromCart,
}) => {
	const { shopId } = useParams();
	const dispatch = useDispatch();
	const { products, next, prev, pagesTotal } = useSelector(
		(state) => state.productsloaded
	);
	const shop = useSelector((state) => state.shop);
	const cargando = useSelector((state) => state.isLoading);
	const [currentPage, setCurrentPage] = useState(0);

	const paging = (num) => {
		if (num >= 0 && num <= pagesTotal) setCurrentPage(num);
	};

	useEffect(() => {
		dispatch(loading());
		dispatch(getShopsId(shopId));
		dispatch(getProductShop(shopId, currentPage));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, shopId, currentPage]);

	// console.log("shopshop", shop);
	return (
		<div>
			{cargando ? (
				<Loading />
			) : (
				<>
					<Nav
						cartItems={cartItems}
						shopEmail={shop.email}
						getTotalItems={getTotalItems}
						handleAddToCart={handleAddToCart}
						handleRemoveFromCart={handleRemoveFromCart}
						handleDeleteFromCart={handleDeleteFromCart}
					/>
					<div className="bg-gray-600">
						<div className="lg:grid lg:grid-cols-2">
							<div className="py-10 px-10 lg:px-0 max-w-3xl lg:max-w-md mx-auto">
								<h2 className="text-4xl tracking-tight font-extrabold text-gray-100">
									<span className="block">Ready to dive in?</span>
									<span className="block">Start your free trial today.</span>
								</h2>
								<p className="text-gray-300 mt-5">
									Lorem Ipsum is simply dummy text of the printing and
									typesetting industry. Lorem Ipsum has been the industry's
									standard dummy text ever since the 1500s, when an unknown
									printer took a galley of type and scrambled it to make a type
									specimen book.
								</p>
								<div className="inline-block shadow mt-5">
									<a
										href="!#"
										className="inline-block py-3 px-4 bg-white hover:bg-indigo-100 text-indigo-500 font-medium border border-transparent rounded-md"
									>
										Sign up for free
									</a>
								</div>
							</div>
							<div className="lg:relative lg:mt-16">
								<img
									className="lg:absolute lg:inset-0 h-10 w-full lg:h-full object-cover object-center lg:rounded-tl-md"
									src="https://alfabetajuega.com/hero/2019/04/CJ-1.jpg?width=1200&aspect_ratio=1200:631"
									alt="Woman workcation on the beach"
								/>
							</div>
						</div>
					</div>

					{/* <InformacionShop /> */}
					<Cards
						products={products}
						handleAddToCart={handleAddToCart}
						cartItems={cartItems}
					/>
					<Paginado
						paging={paging}
						currentPage={currentPage}
						pagesTotal={pagesTotal}
						prev={prev}
						next={next}
					/>
				</>
			)}
		</div>
	);
};

export default Home;
