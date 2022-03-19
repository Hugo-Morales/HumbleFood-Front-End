import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import NavShop from "../../components/shops/NavShops";
import Carousell from "../../components/carousell/Carousell";
import CardsShops from "../../components/shops/CardsShops";
import Loading from "../../components/loading/Loading";
import PaginationControlled from "../TiendaPanel/right/pagination";
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
		console.log(num);
	};

	const newUser = {
		userId: id,
		name: user?.name,
		name_user: user?.nickname,
		email: user?.email,
		direction: "",
	};

	useEffect(() => {
		if (isAuthenticated && user) dispatch(postnewUser(newUser));
		if (isAuthenticated) dispatch(getAllFavorites(id));
	});

	useEffect(() => {
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
					<NavShop />
					<Carousell />
					<CardsShops shops={shops.shops} id={id} />
					{/* <Paginado
						next={shops.next}
						prev={shops.prev}
						pagesTotal={shops.pagesTotal}
						paging={paging}
						currentPage={currentPage}
					/> */}
					<PaginationControlled
						next={shops.next}
						prev={shops.prev}
						pagesTotal={shops.pagesTotal}
						paging={paging}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</>
			)}
		</>
	);
}
