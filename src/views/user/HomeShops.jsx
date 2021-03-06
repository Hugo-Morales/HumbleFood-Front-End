import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import NavShops2 from "../../components/shops/NavShops2";
import Carousell from "../../components/carousell/Carousell";
import CardsShops from "../../components/shops/CardsShops";
import Loading from "../../components/loading/Loading";
import {
	getShops,
	loading,
	postnewUser,
	getAllFavorites,
	reset,
} from "../../redux/actions";

export default function HomeShops() {
	const dispatch = useDispatch();
	const { isAuthenticated, user, isLoading } = useAuth0();
	const shops = useSelector((state) => state.shops);
	const cargando = useSelector((state) => state.isLoading);
	const id = user?.sub.split("|")[1];
	const [currentPage, setCurrentPage] = useState(0);

	const paging = (num) => {
		if (num >= 0 && num <= shops.pagesTotal) {
			setCurrentPage(num);
		}
	};

	const newUser = {
		userId: id,
		name: user?.name,
		name_user: user?.nickname,
		email: user?.email,
		direction: "",
	};

	useEffect(() => {
		if (isAuthenticated) dispatch(getAllFavorites(id));
	});

	useEffect(() => {
		if (isAuthenticated && user) dispatch(postnewUser(newUser));
		dispatch(loading());
		dispatch(getShops(currentPage));

		return () => {
			dispatch(reset());
		};
	}, [dispatch, currentPage]);

	if (isLoading) return <Loading />;

	return (
		<>
			{cargando ? (
				<Loading />
			) : (
				<>
					<NavShops2 />
					<Carousell />
					<CardsShops
						shops={shops.shops}
						id={id}
						pagesTotal={shops.pagesTotal}
						paging={paging}
						currentPage={currentPage}
					/>
				</>
			)}
		</>
	);
}
