import { Link, useParams } from "react-router-dom";

const Card = ({ product, handleAddToCart }) => {
	const { id, name, image, price, discount, categories, stock } = product;
	const items = JSON.parse(localStorage.getItem("carrito"));
	const stock_max = items?.find((i) => i.id === id);
	// console.log(stock_max?.amount);
	const { shopId } = useParams();

	return (
		<>
			<div className="flex justify-center items-center mobile:w-11/12 w-full drop-shadow-lg">
				<div className="relative w-full bg-white shadow-md h-96 rounded-xl  flex flex-col justify-around items-center overflow-hidden sm:flex-row sm:h-52 sm:w-11/12 md:w-96">
					<div className="md:h-full md:w-1/2">
						<Link to={`/products/${shopId}/${id}`}>
							<img className="w-full md:h-full" src={image} alt="comida" />
						</Link>
					</div>
					<div className=" flex-1 w-full flex flex-col items-baseline justify-around md:h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2">
						<div className="flex flex-col justify-start items-baseline">
							<Link to={`/products/${shopId}/${id}`}>
								<h1 className="text-lg font-normal mb-0 text-gray-600 font-sans">
									{name}
								</h1>
							</Link>
							<span className="text-xs text-indigo-300 mt-0">
								{categories?.join(" ")}
							</span>
						</div>
						{/* <p className="text-xs text-gray-500 w-4/5">{description}</p> */}
						<div className="w-full flex flex-col">
							<Link to={`/products/${shopId}/${id}`}>
								<div className="w-full flex lg:flex-row lg:justify-between sm:justify-between sm:flex items-end lg:items-center pr-5 mb-2">
									<h1 className="font-bold line-through text-red-500">
										{new Intl.NumberFormat("en-IN", {
											style: "currency",
											currency: "USD",
										}).format(price)}{" "}
									</h1>
									<div className="pb-1">
										<h1 className="font-bold text-green-500">-{discount}%</h1>
									</div>
								</div>
								<h1 className="font-bold text-gray-500 text-3xl mr-2 mb-2">
									{new Intl.NumberFormat("en-IN", {
										style: "currency",
										currency: "USD",
									}).format((price / 100) * discount)}{" "}
								</h1>
							</Link>
							{stock_max?.amount === stock ? (
								<div className="bg-red-600 mr-5 text-white px-3 py-1 rounded-sm shadow-md flex justify-center">
									<h1>Agotado</h1>
								</div>
							) : (
								<button
									onClick={() => handleAddToCart(product)}
									className="bg-gray-700 mr-5 text-white px-3 py-1 rounded-sm shadow-md flex justify-center"
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
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Card;
