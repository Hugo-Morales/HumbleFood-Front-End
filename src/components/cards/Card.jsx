import { Link, useParams } from "react-router-dom";

const Card = ({ product, handleAddToCart, shop }) => {
	const { id, name, image, price, discount, categories } = product;
	const { shopId } = useParams();

	return (
		<>
			<div className="flex justify-center items-center w-full drop-shadow-4xl">
				<div className="relative bg-white shadow-md h-96 mx-3 rounded-3xl  flex flex-col justify-around items-center overflow-hidden sm:flex-row sm:h-52 sm:w-3/5 md:w-96">
					<div className="h-full w-1/2">
						<Link to={`/products/${shopId}/${id}`}>
							<img
								className="relative w-full h-full"
								src={image}
								alt="comida"
							/>
						</Link>
					</div>
					<div className=" flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2">
						<div className="flex flex-col justify-start items-baseline">
							<Link to={`/products/${shopId}/${id}`}>
								<h1 className="text-lg font-normal mb-0 text-gray-600 font-sans">
									{name}
								</h1>
							</Link>
							{/* Solucion momentanea para que no se rompa la card al filtrar por descuento */}
							{/* <span className="text-xs text-indigo-300 mt-0">{categories}</span> */}
						</div>
						{/* <p className="text-xs text-gray-500 w-4/5">{description}</p> */}
						<div className="w-full flex flex-col">
							<div className="w-full flex justify-end items-center pr-5 pb-1">
								<Link to={`/products/${shopId}/${id}`}>
									<h1 className="font-bold text-green-500">
										{discount}% descuento!
									</h1>
								</Link>
							</div>
							<div className="w-full flex justify-between items-center">
								<h1 className="font-bold text-gray-500">${price}</h1>

								<button
									onClick={() => handleAddToCart(product)}
									className="bg-gray-700 mr-5 text-white px-3 py-1 rounded-sm shadow-md flex"
								>
									<p>Añadir</p>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-shopping-cart-plus"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#ffffff"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<circle cx="6" cy="19" r="2" />
										<circle cx="17" cy="19" r="2" />
										<path d="M17 17h-11v-14h-2" />
										<path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
										<path d="M15 6h6m-3 -3v6" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Card;
