import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsFillHeartFill } from "react-icons/bs";
import {
	addFavorites,
	getAllFavorites,
	removeFavorites,
} from "../../redux/actions";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

const CardShop = ({ shop, userId }) => {
	const dispatch = useDispatch();
	const { isAuthenticated } = useAuth0();
	const { id, name, image, description } = shop;
	const misfavoritos = useSelector((state) => state.allFavorites);
	const shopsID = misfavoritos.map((i) => i.id);
	const shopIdguardado = shopsID.includes(id);
	const [save, setSave] = useState(false);
	const [deleteFav, setDeleteFav] = useState(false);
	// console.log(shopID.includes(id))
	// console.log("deleteFav ", deleteFav);
	useEffect(() => {
		if (save) {
			// console.log(save);
			dispatch(addFavorites(userId, id));
			dispatch(getAllFavorites(userId));
		} else if (deleteFav) {
			dispatch(removeFavorites(userId, id));
			dispatch(getAllFavorites(userId));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [save, deleteFav]);
	const guardar = () => {
		if (isAuthenticated) {
			if (!save) {
				setSave(true);
				setDeleteFav(false);
				// console.log("Click");
			} else {
				setSave(false);
				setDeleteFav(true);
			}
		} else {
			Swal.fire({
				icon: "warning",
				title: "La funcion añadir a favoritos no esta disponible",
				text: "¡Registrate primero para poder usarla!",
			});
		}
	};

	const borrar = () => {
		if (!deleteFav) {
			setDeleteFav(true);
			setSave(false);
			// console.log("Delete: ", deleteFav);
		} else {
			setDeleteFav(false);
			setSave(true);
		}
	};

	return (
		<>
			<div className="flex justify-center items-center mobile:ml-6 mobile:w-11/12 w-full drop-shadow-lg">
				<div className="w-full relative bg-white shadow-md h-96 rounded-xl  flex flex-col justify-around items-center overflow-hidden sm:flex-row sm:h-52 sm:w-11/12 md:w-96">
					<div className="absolute top-0 md:left-0 md:w-2/3 md:h-full">
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
						<button
							// onClick={(e) => handleclick(e)}
							id="heart"
							className="absolute bg-gray-600 text-white p-2.5 rounded-sm shadow-md top-0 left-0"
						>
							<BsFillHeartFill
								className={
									save && !deleteFav
										? "text-red-600"
										: shopIdguardado && !deleteFav
										? "text-red-600"
										: "text-white-500"
								}
							/>
						</button>
					</div>
					<div className="mobile:absolute mobile:bottom-0 md:right-0 md:top-0 w-full xl:my-2 flex justify-center mobile:h-1/4 md:h-full md:w-1/3">
						<div className="mobile:absolute m-2 flex flex-col justify-center">
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
