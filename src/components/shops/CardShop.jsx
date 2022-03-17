import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsFillHeartFill } from "react-icons/bs";
import {
	addFavorites,
	getAllFavorites,
	removeFavorites,
} from "../../redux/actions";
import { useEffect, useState } from "react";

const CardShop = ({ shop, userId }) => {
	const dispatch = useDispatch();
	const { id, name, image, description } = shop;
	const misfavoritos = useSelector((state) => state.allFavorites);
	const shopsID = misfavoritos.map((i) => i.id);
	const shopIdguardado = shopsID.includes(id);
	const [save, setSave] = useState(false);
	const [deleteFav, setDeleteFav] = useState(false);
	// console.log(shopID.includes(id))
	
	useEffect(() => {
		if(save){
			console.log(save);
			dispatch(addFavorites(userId, id));
			dispatch(getAllFavorites(userId));
		}
		else if(deleteFav){
			dispatch(removeFavorites(userId, id));
			dispatch(getAllFavorites(userId));
		}
	},[save, deleteFav])
	const guardar = () => {
		// console.log(id);
		setSave(true);
		setDeleteFav(false)
	};
	
	const borrar = () => {
		// console.log(id);
		setDeleteFav(true)
		setSave(false);
	};
	

	return (
		<>
			<div className="flex justify-center items-center mobile:ml-6 mobile:w-11/12 w-full drop-shadow-lg">
				<div className="w-full relative bg-white shadow-md h-96 rounded-xl  flex flex-col justify-around items-center overflow-hidden sm:flex-row sm:h-52 sm:w-11/12 md:w-96">
					<div className="absolute top-0 md:left-0 md:w-2/3 md:h-full md:h-64">
						<img
							className="w-full h-3/4 max-h-72 md:h-full"
							src={image}
							alt="comida"
						/>
					</div>
					<div
						className="cursor-pointer"
						onClick={shopIdguardado ? borrar : guardar}
					>
						<button className="absolute bg-gray-600 text-white p-2.5 rounded-sm shadow-md top-0 left-0">
							<BsFillHeartFill
								className={save && !deleteFav ? "text-red-600" : "text-white-500"}
							/>
						</button>
					</div>
					<div className="mobile:absolute md:right-0 md:top-0 w-full xl:my-2 flex justify-center md:h-full md:w-1/3">
						<div className="mobile:absolute m-2 flex flex-col justify-center mobile:bottom-180">
							<Link to={`/productShop/${id}`}>
								<h1 className="text-xl md:text-lg font-bold mb-2 text-gray-600 font-sans">
									{name}
								</h1>
							</Link>
							<p className="text-md md:text-sm text-black w-4/5">
								{description}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CardShop;
