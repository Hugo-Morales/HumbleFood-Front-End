import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideLeft from "./left/SideLeft";
import SideRight from "./right/SideRight";
import Loading from "../../components/loading/Loading";
import { getProductShop, loading, getdataUser } from "../../redux/actions";

export default function ContainerT({ user }) {
	const [id, setId] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const dispatch = useDispatch();
	const productos = useSelector((state) => state.productShop);
	const cargando = useSelector((state) => state.isLoading);
	const usuario = useSelector((state) => state.dataUser);

	const { userId } = useParams();
	// console.log(user, 'user');
	// console.log(usuario, 'usuario')


	const paging = (num) => {
		if (num >= 0 && num <= productos.pagesTotal) {
			setCurrentPage(num);
		}
	};

	useEffect(() => {
		dispatch(loading());
		dispatch(getdataUser(userId));
		dispatch(getProductShop(usuario?.shopsId, currentPage));

		return () => {
			setCurrentPage(0);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, userId, currentPage]);

	return (
		<>
			{cargando ? (
				<Loading />
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
					{/* Lado Izquierdo */}
					<div className="col-span-1">
						<SideLeft
							name={user.name}
							setId={setId}
							rol={usuario.rol}
							shopsId={usuario.shopsId}
						/>
					</div>
					{/* Lado Derecho */}
					<div className="col-span-3">
						<SideRight
							product={productos}
							idS={id}
							rol={usuario.rol}
							shopsId={usuario?.shopsId}
							paging={paging}
							currentPage={currentPage}
							next={productos.next}
							prev={productos.prev}
							pagesTotal={productos.pagesTotal}
						/>
					</div>
				</div>
			)}
		</>
	);

}
