import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getShopsId, loading, reset } from "../../redux/actions";
import Nav from "../../components/nav/Nav";
import Cards from "../../components/cards/Cards";
import Loading from "../../components/loading/Loading";
import ButtonExit from "../../../src/components/buttonExit/buttonexit";

const Home = ({
	open,
	setOpen,
	cartItems,
	setCartItems,
	getTotalItems,
	handleAddToCart,
	handleRemoveFromCart,
	handleDeleteFromCart,
}) => {
	const { shopId } = useParams();
	const dispatch = useDispatch();
	const { products, pagesTotal } = useSelector((state) => state.productsloaded);
	const shop = useSelector((state) => state.shop);
	const [currentPage, setCurrentPage] = useState(0);
	const cargando = useSelector((state) => state.isLoading);

	const paging = (num) => {
		if (num >= 0 && num <= pagesTotal) setCurrentPage(num);
	};

	useEffect(() => {
		dispatch(loading());
		dispatch(getShopsId(shopId));
		return () => {
			dispatch(reset());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, shopId]);

	// console.log("productos por categoría", products);

	return (
		<>
			<Nav
				open={open}
				setOpen={setOpen}
				cartItems={cartItems}
				setCartItems={setCartItems}
				shopEmail={shop.email}
				getTotalItems={getTotalItems}
				handleAddToCart={handleAddToCart}
				handleRemoveFromCart={handleRemoveFromCart}
				handleDeleteFromCart={handleDeleteFromCart}
			/>
			<div className="bg-gradient-to-r from-gray-500 to-isabelline">
				<div className="grid md:grid-cols-2">
					<div className="py-10 px-10 lg:px-0 max-w-3xl lg:max-w-md mx-auto font-bold 	font-weight: 700">
						<h2 className="text-4xl tracking-tight font-extrabold text-gray-100">
							<span className="block">{shop.name}</span>
						</h2>
						<p className="text-gray-300 mt-5">{shop.description}</p>

						<ButtonExit
							text="Volver a ver mas tiendas"
							ruta="/home"
							className="mt-4 bg-red-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full"
						/>
					</div>
					<div className="flex justify-center lg:w-96 mobile:mx-auto">
						<img
							className="w-64 lg:w-96 mobile:p-6 lg:p-0"
							src={shop.image}
							alt="Woman workcation on the beach"
						/>
					</div>
				</div>
			</div>

			{cargando ? (
				<Loading />
			) : (
				<>
					{/* <InformacionShop /> */}
					<Cards
						products={products}
						handleAddToCart={handleAddToCart}
						shop={shop.name}
						paging={paging}
						currentPage={currentPage}
						pagesTotal={pagesTotal}
					/>
				</>
			)}
		</>
	);
};

export default Home;
