export default function ItemsTable({ datos, borrar }) {
	return (
		<div className="container">
			<div className="flex flex-wrap">
				<div className="w-full h-screen">
					<div className="max-w-full h-screen overflow-y-auto overflow-x-auto">
						<table className="table-auto w-full">
							<thead>
								<tr className="text-center border-b-2">
									<th className="w-1/5 min-w-[160px] text-lg font-bold text-black py-4 lg:px-4 border-l border-transparent">
										Nombre del Producto
									</th>
									<th className="w-1/5 min-w-[160px] text-lg font-bold text-black py-4 lg:px-4 border-l border-transparent">
										Precio
									</th>
									<th className="w-1/5 min-w-[160px] text-lg font-bold text-black py-2 lg:px-4 border-l border-transparent">
										Cantidad
									</th>
									<th className="w-1/5 min-w-[160px] text-lg font-bold text-black py-4 lg:px-4 border-l border-transparent">
										Tienda
									</th>
									<th className="w-1/5 min-w-[160px] text-lg font-bold text-black py-4 lg:px-4 border-l border-transparent">
										Borrar
									</th>
								</tr>
							</thead>
							<tbody>
								{datos?.map((d, index) => (
									<tr key={index}>
										<td className="px-3 py-4 whitespace-nowrap border-b-2 border-r-2">
											<div className="flex items-center">
												<div className="flex-shrink-0 h-10 w-10">
													<img
														className="h-10 w-10 rounded-full"
														src={d?.image}
														alt=""
													/>
												</div>
												<div className="ml-4 w-60">
													<div className="truncate text-sm font-bold">
														{d.name}
													</div>
													<div className="text-sm text-gray-500">
														{d?.categories?.join(" ")}
													</div>
												</div>
											</div>
										</td>
										<td className="px-3 py-4 whitespace-nowrap border-b-2 border-r-2">
											<div className="flex items-center justify-center">
												{new Intl.NumberFormat("en-IN", {
													style: "currency",
													currency: "USD",
												}).format(d.price - (d.price / 100) * d.discount)}
											</div>
										</td>
										<td className="px-3 py-4 whitespace-nowrap border-b-2 border-r-2">
											<div className="flex items-center justify-center">
												{d.amount}
											</div>
										</td>
										<td className="px-3 py-4 whitespace-nowrap border-b-2 border-r-2">
											<div className="flex items-center justify-center truncate">
												{d.shop}
											</div>
										</td>
										<td className="px-3 py-4 whitespace-nowrap border-b-2 border-r-2">
											<div className="flex items-center justify-center">
												<button
													className="hover:text-indigo-900 bg-red-800 p-2 text-white rounded-lg"
													onClick={() => borrar(d.name)}
												>
													Borrar
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
