import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationControlled from "./pagination";
import InfoDataUser from "./InfoDataUser";
import Edit from "../Edit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
	deleteProduct,
	getProductShop,
	getallproducts,
} from "../../../redux/actions";

export default function Table({ p, pagesTotal, paging, currentPage }) {
	// console.log(p[1].shopId);
	const MySwal = withReactContent(Swal);
	const dataUser = useSelector((state) => state.dataUser);
	const shop = useSelector((state) => state.shop);
	const dispatch = useDispatch();
	const [showEdit, setShowEdit] = useState(false);
	const [producto, setProducto] = useState([]);

	const confirmProduct = (id) => {
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
					title: "¡El producto se borró correctamente!",
					text: "",
					icon: "success",
					timer: 2000,
					timerProgressBar: true,
					showConfirmButton: false,
				});

				dispatch(deleteProduct(id));
				if (dataUser?.rol === 2) {
					if (p.length === 1) {
						setTimeout(() => {
							dispatch(getallproducts(currentPage - 1));
						}, 700);
					} else {
						setTimeout(() => {
							dispatch(getallproducts(currentPage));
						}, 700);
					}
				} else if (dataUser?.rol === 1) {
					if (p.length === 1) {
						setTimeout(() => {
							dispatch(getProductShop(dataUser?.shopsId, currentPage - 1));
						}, 700);
					} else {
						setTimeout(() => {
							dispatch(getProductShop(dataUser?.shopsId, currentPage));
						}, 700);
					}
				}
			}
		});
	};

	const editProduct = (p) => {
		setShowEdit(true);
		setProducto(p);
	};

	if (showEdit) {
		return <Edit setShowEdit={setShowEdit} info={producto} />;
	}

	return (
		<>
			{shop.authorization === false ? (
				<>
					<InfoDataUser dataUser={dataUser} />
					<div className="bg-white rounded-lg pt-8 pb-8 text-center">
						<h1 className="font-bold uppercase">
							Tu tienda está en proceso de aprobación
						</h1>
					</div>
				</>
			) : (
				<>
					{currentPage === 0 ? <InfoDataUser dataUser={dataUser} /> : null}
					<div className="flex flex-col">
						<div className="overflow-x-auto">
							<div className="py-2 align-middle inline-block min-w-full">
								<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
									<table className="w-full divide-y divide-gray-200">
										<thead className="bg-gray-50">
											<tr>
												<th
													scope="col"
													className="px-6 py-3 font-bold text-xs uppercase tracking-wider text-center"
												>
													Nombre del Producto
												</th>
												<th
													scope="col"
													className="px-6 py-3 font-bold text-xs uppercase tracking-wider text-center"
												>
													Stock
												</th>
												<th
													scope="col"
													className="px-6 py-3 font-bold text-xs uppercase tracking-wider text-center"
												>
													{dataUser.rol === 2
														? "Nombre de la Tienda"
														: "Estado"}
												</th>
												<th
													scope="col"
													className="px-6 py-3 font-bold text-xs uppercase tracking-wider text-center"
												>
													Precio Total
												</th>
												<th scope="col" className="relative px-6 py-3">
													<p>Editar</p>
												</th>
												<th scope="col" className="relative px-6 py-3">
													<p>Borrar</p>
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{p?.length ? (
												p.map((p, index) => (
													<tr key={index} className="dark:hover:bg-gray-400">
														<td className="px-6 py-4 whitespace-nowrap">
															<div className="flex items-center">
																<div className="flex-shrink-0 h-10 w-10">
																	<img
																		className="h-10 w-10 rounded-full"
																		src={p?.image}
																		alt=""
																	/>
																</div>
																<div className="ml-4 w-60">
																	<div className="truncate text-sm font-medium text-gray-900">
																		{p.name}
																	</div>
																	<div className="text-sm text-gray-500">
																		{p?.categories?.join(" ")}
																	</div>
																</div>
															</div>
														</td>
														<td className="py-4 whitespace-nowrap text-center">
															{p?.stock === 0 ? (
																<div className="text-sm text-gray-900">
																	Sin Stock
																</div>
															) : (
																<div className="text-sm text-gray-500">
																	{p?.stock}
																</div>
															)}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-center">
															{p?.stock === 0 ? (
																<div className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
																	Sin Stock
																</div>
															) : (
																<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
																	Creada
																</span>
															)}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-center">
															{p?.stock === 0 ? (
																<>
																	<div className="text-sm text-gray-900">
																		Sin Stock
																	</div>
																</>
															) : (
																<>
																	<div className="text-gray-900">
																		<p>
																			{new Intl.NumberFormat("en-IN", {
																				style: "currency",
																				currency: "USD",
																			}).format(p?.price * p?.stock)}
																		</p>
																	</div>
																	<div className="text-gray-500">
																		<p>
																			{new Intl.NumberFormat("en-IN", {
																				style: "currency",
																				currency: "USD",
																			}).format(p?.price)}{" "}
																			c/stock
																		</p>
																	</div>
																</>
															)}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
															<button
																className="bg-blue-200 text-black active:bg-blue-500 
        font-bold p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
																type="button"
																onClick={() => editProduct(p)}
															>
																Editar
															</button>
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
															<button
																className="hover:text-indigo-900 bg-red-800 p-2 text-white rounded-lg"
																onClick={() => confirmProduct(p?.id)}
															>
																Borrar
															</button>
														</td>
													</tr>
												))
											) : (
												<tr className="w-full">
													<td className="text-center py-2">
														No hay ninguno producto actualmente
													</td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<PaginationControlled
						pagesTotal={pagesTotal}
						paging={paging}
						currentPage={currentPage}
					/>
				</>
			)}
		</>
	);
}
