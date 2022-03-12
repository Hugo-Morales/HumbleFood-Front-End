import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import NavShop from "../../components/shops/NavShops";
import Carousell from "../../components/carousell/Carousell";
import CardsShops from "../../components/shops/CardsShops";
import Loading from "../../components/loading/Loading";
import { getShops, loading, postnewUser } from "../../redux/actions";

export default function HomeShops() {
	const dispatch = useDispatch();
	const { isAuthenticated, user, isLoading } = useAuth0();
	const shops = useSelector((state) => state.shops);
	const cargando = useSelector((state) => state.isLoading);

	const newUser = {
		userId: user?.sub.split("|")[1],
		name: user?.name,
		name_user: user?.nickname,
		email: user?.email,
		direction: "",
	};

	useEffect(() => {
		if (isAuthenticated && user) dispatch(postnewUser(newUser));
	});

	useEffect(() => {
		dispatch(loading());
		dispatch(getShops());
	}, [dispatch]);

	if (isLoading) return <Loading />;

	return (
		<>
			{cargando ? (
				<Loading />
			) : (
				<>
					<NavShop />
					<Carousell />
					<CardsShops shops={shops} />
				</>
			)}
		</>
	);
}
