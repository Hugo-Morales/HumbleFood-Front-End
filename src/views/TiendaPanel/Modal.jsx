export default function Model({ setShowModal, name, id, del }) {
	return (
		<div className='className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"'>
			<div className="relative w-auto my-6 mx-auto max-w-3xl">
				<div className='className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"'>
					<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
						<h3 className="text-3xl font-semibold">Confirmar</h3>
						<button
							className=" p-2 bg-red-700 border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none rounded-lg text-center"
							onClick={() => setShowModal(false)}
						>
							<span className="text-black h-6 w-6 block outline-none focus:outline-none fonttt">
								{" "}
								X{" "}
							</span>
						</button>
					</div>
					{/*body*/}
					<div className="relative px-6 flex-auto">
						<p className="my-4 text-blueGray-500 text-lg leading-relaxed">
							¿Deseas borrar el producto "{name}"?
						</p>
					</div>
					{/* footer */}
					<div className="flex items-center justify-end px-2 py-2 border-t border-solid border-blueGray-200 rounded-b">
						<button
							className="bg-red-600 font-bold uppercase px-6 py-3 text-sm outline-none rounded focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							onClick={() => setShowModal(false)}
						>
							No
						</button>
						<button
							className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							onClick={() => del(id)}
						>
							SÍ
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
