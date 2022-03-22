export default function ItemsTable({ shops, submit }) {
	return (
		<div className="container">
			<div className="flex flex-wrap">
				<div className="w-full h-screen">
					<div className="max-w-full h-screen overflow-y-auto overflow-x-auto">
						<table className="table-auto w-full">
							<thead>
								<tr className="text-center border-b-2">
									<th className="w-1/5 min-w-[160px] text-lg font-bold text-black py-4 lg:px-4 border-l border-transparent">
										Nombre de la Tienda
									</th>
									<th className="w-1/5 min-w-[160px] text-lg font-bold text-black py-4 lg:px-4 border-l border-transparent">
										Dirección
									</th>
									<th className="w-1/5 min-w-[160px] text-lg font-bold text-black py-2 lg:px-4 border-l border-transparent">
										Descripción
									</th>
									<th className="w-1/5 min-w-[160px] text-lg font-bold text-black py-4 lg:px-4 border-l border-transparent">
										Estado
									</th>
								</tr>
							</thead>
							<tbody>
								{shops?.map((s, index) => (
									<tr key={index}>
										<td className="px-3 py-4 whitespace-nowrap border-b-2 border-r-2">
											<div className="flex items-center">
												<div className="flex-shrink-0 h-10 w-10">
													<img
														className="h-10 w-10 rounded-full"
														src={s?.image}
														alt=""
													/>
												</div>
												<div className="ml-4 w-60">
													<div className="truncate text-sm font-bold">
														{s?.name}
													</div>
												</div>
											</div>
										</td>
										<td className="px-3 py-4 whitespace-nowrap border-b-2 border-r-2">
											<div className="flex items-center justify-center font-bold">
												{s?.direction}
											</div>
										</td>
										<td className="whitespace-nowrap border-b-2 border-r-2">
											<div className="flex items-center justify-center font-bold truncate">
												{s?.description}
											</div>
										</td>
										<td className="px-3 py-4 whitespace-nowrap border-b-2 border-r-2">
											<div className="flex items-center justify-center font-bold">
												{s?.authorization ? (
													<>Autorizado</>
												) : (
													<button
														className="bg-indigo-800 p-2 text-white rounded-lg hover:text-black"
														onClick={(e) => submit(e, s)}
													>
														¿Autorizar?
													</button>
												)}
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
