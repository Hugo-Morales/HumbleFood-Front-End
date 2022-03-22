import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/loading/Loading";
import PaginationControlled from "../pagination";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
	getAllUser,
	loading_panel,
	banU,
	banS,
	admin,
} from "../../../../redux/actions";

export default function HacerAdmin() {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(0);
	const users = useSelector((state) => state.allUser);
	const cargando = useSelector((state) => state.loadingPanel);
	const paging = (num) => {
		if (num >= 0 && num <= users.pagesTotal) {
			setCurrentPage(num);
		}
	};
	// console.log(users);
	const MySwal = withReactContent(Swal);

	useEffect(() => {
		dispatch(loading_panel());
		dispatch(getAllUser(currentPage));
	}, [dispatch, currentPage]);

	const banUser = (type, id) => {
		MySwal.fire({
			title: "¿Estás seguro?",
			text: "",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí",
			cancelButtonText: "No",
			reverseButtons: true,
			showCloseButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				MySwal.fire({
					title:
						type === "ban"
							? "¡El usuario fue baneado!"
							: "¡El usuario fue desbaneado!",
					text: "",
					icon: "success",
					timer: 2000,
					timerProgressBar: true,
					showConfirmButton: false,
				});
				dispatch(banU(type, id));
				dispatch(loading_panel());
				setTimeout(() => {
					dispatch(getAllUser(currentPage));
				}, 700);
			}
		});
	};

	const banShop = (type, id) => {
		MySwal.fire({
			title: "¿Estás seguro?",
			text: "",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí",
			cancelButtonText: "No",
			reverseButtons: true,
			showCloseButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				MySwal.fire({
					title:
						type === "ban"
							? "¡La Shop fue baneada!"
							: "¡La Shop fue desbaneada!",
					text: "",
					icon: "success",
					timer: 2000,
					timerProgressBar: true,
					showConfirmButton: false,
				});
				dispatch(banS(type, id));
				dispatch(loading_panel());
				setTimeout(() => {
					dispatch(getAllUser(currentPage));
				}, 700);
			}
		});
	};

	const adminUser = (type, id) => {
		MySwal.fire({
			title: "¿Estás seguro?",
			text: "",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí",
			cancelButtonText: "No",
			reverseButtons: true,
			showCloseButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				MySwal.fire({
					title:
						type === "makeAdmin"
							? "¡El Usuario ya es admin!"
							: "¡El Usuario ya no es admin!",
					text: "",
					icon: "success",
					timer: 2000,
					timerProgressBar: true,
					showConfirmButton: false,
				});
				dispatch(admin(type, id));
				dispatch(loading_panel());
				setTimeout(() => {
					dispatch(getAllUser(currentPage));
				}, 700);
			}
		});
	};

	return (
		<>
			{cargando ? (
				<div className="flex justify-center items-center bg-white">
					<Loading />
				</div>
			) : (
				<>
					<div className="flex flex-col mb-8">
						<div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
							<div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
								<table className="min-w-full">
									<thead>
										<tr>
											<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
												ID | Nombre
											</th>
											<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
												Email
											</th>
											<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
												Tipo
											</th>
											<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
												Banear
											</th>
										</tr>
									</thead>

									<tbody className="bg-white">
										{users.usersLis?.map((u, index) => (
											<tr key={index}>
												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													<div className="rounded-full px-2 text-center bg-orange-300 text-sm font-medium leading-5 text-gray-900 mb-3">
														{u?.name}
													</div>
													<div className="text-sm font-medium leading-5 text-gray-900">
														{u?.id}
													</div>
												</td>
												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													<div className="text-sm leading-5 text-gray-500">
														{u?.email}
													</div>
												</td>
												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													{u?.rol === 3 ? (
														<span className="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
															Baneado
														</span>
													) : u?.rol === 2 ? (
														<span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-300 rounded-full">
															Admin
														</span>
													) : u.rol === 1 ? (
														<span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
															Vendedor
														</span>
													) : (
														<span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
															Comprador
														</span>
													)}
												</td>
												<td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
													{u?.rol === 3 ? (
														u?.shopsId.length === 1 ? (
															<button
																className="inline-flex px-2 mx-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full"
																onClick={() => banShop("unban", u?.userId)}
															>
																Quitar Ban de la Tienda
															</button>
														) : (
															<button
																className="inline-flex px-2 mx-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full"
																onClick={() => banUser("unban", u?.userId)}
															>
																Quitar Ban
															</button>
														)
													) : u?.rol === 2 ? (
														<button
															className="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full"
															onClick={() => adminUser("takeAdmin", u?.userId)}
														>
															Quitar Admin
														</button>
													) : u?.rol === 1 ? (
														<>
															<button
																className="inline-flex px-2 mx-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full"
																onClick={() => banShop("ban", u?.userId)}
															>
																Banear Tienda
															</button>
														</>
													) : (
														<>
															<button
																className="inline-flex px-2 mx-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full"
																onClick={() => banUser("ban", u?.userId)}
															>
																Banear User
															</button>
															<button
																className="inline-flex px-2 mx-2 mt-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
																onClick={() =>
																	adminUser("makeAdmin", u?.userId)
																}
															>
																Hacer Admin
															</button>
														</>
													)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<PaginationControlled
						pagesTotal={users.pagesTotal}
						paging={paging}
						currentPage={currentPage}
					/>
				</>
			)}
		</>
	);
}
