import React from "react";
import ButtonExit from "../../../components/buttonExit/buttonexit";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	postNewShop,
	getdataUser,
	loading,
	stop,
} from "../../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import Styles from "./createShop.module.css";
import Swal from "sweetalert2";
import {
	ref,
	getDownloadURL,
	uploadBytesResumable,
	deleteObject,
} from "firebase/storage";
import { storage } from "../../TiendaPanel/right/Create/firebase";
import withReactContent from "sweetalert2-react-content";
import { MdDelete } from "react-icons/md";

const validate = (input) => {
	let err = {};
	let regex = /[\W]/y;
	let notnumber = /[\d]/g;


	if (!input.name?.trim()) {
		err.name = "Este campo es obligatorio.";
	}
	if (notnumber.test(input.name)) {
		err.name = "No se permiten números.";
	}
	if (regex.test(input.name)) {
		err.name = "No se permiten caractéres especiales.";
	}

	if (!input.description?.trim()) {
		err.description = "Este campo es obligatorio.";

	}
	if (notnumber.test(input.description)) {
		err.description = "No se permiten números.";

	}
	if (regex.test(input.description)) {
		err.description = "No se permiten caractéres especiales.";

	}
	if (!input.email?.trim()) {
		err.email = "Este campo es obligatorio.";
	}
	// if (!input.directionShop?.trim()) {
	// 	err.direction = 'Rellene este campo'
	// }

	console.log(err)
	return err
}

const CreateShop = ({ user }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const dataUser = useSelector((state) => state.dataUser)
	const directionShop = useSelector((state) => state?.shopDirection[0]);
	const cargando = useSelector((state) => state.isLoading);
	const MySwal = withReactContent(Swal);

	useEffect(() => {
		dispatch(loading());
		dispatch(getdataUser(user?.sub.split("|")[1]));
		dispatch(stop());
	}, [dispatch, user]);

	// console.log(dataUser);
	const [nameI, setNameI] = useState("");
	const [err, Seterr] = useState({});
	const [progress, setProgress] = useState(0);
	const [newShop, setNewShop] = useState({
		name: "",
		direction: directionShop,
		description: "",
		image: "",
		email: "",
	});

	const handleInputChange = (e) => {
		setNewShop({
			...newShop,
			[e.target.name]: e.target.value,
		});
		Seterr(
			validate({
				...newShop,
				[e.target.name]: e.target.value,
			})
		);
	};
	const handleformSubmit = (e) => {
		e.preventDefault();
		let shop = {
			name: newShop.name,
			direction: directionShop,
			description: newShop.description,
			image: newShop.image ? newShop.image : "https://img.freepik.com/vector-gratis/carro-tienda-edificio-tienda-dibujos-animados_138676-2085.jpg",
			userId: dataUser?.id,
			email: newShop.email,
		}
		if (!directionShop) {
			MySwal.fire({
				position: "center",
				icon: "error",
				title: "Ha ocurrido un error",
				text: "Revisa tu direccion por favor",
				showConfirmButton: true,
				timer: 6000,
			});
			return
		} else if (err.name || err.description || err.email) {
			MySwal.fire({
				position: "center",
				icon: "error",
				title: "Ha ocurrido un error",
				text: "Verifica que los campos tengan informacion correcta",
				showConfirmButton: true,
				timer: 6000,
			});
			return
		}
		MySwal.fire({
			position: "center",
			icon: "success",
			title: "Tu tienda ha sido registrada con exito",
			text: "Revisa tu email, donde te llegará la aprobación",
			showConfirmButton: true,
			timer: 6000,
		});
		dispatch(postNewShop(shop));
		// navigate(`/settings/${user?.sub.split("|")[1]}`);
	};



	const handleImagen = (e) => {
		const file = e.target.files[0];
		uploadFiles(file);
	};

	const uploadFiles = (file) => {
		//
		if (!file) return;
		const sotrageRef = ref(storage, `shops/${file.name}`);
		setNameI(file.name);
		const uploadTask = uploadBytesResumable(sotrageRef, file);



		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const prog = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(prog);
			},
			(error) => console.log(error),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setNewShop({
						...newShop,
						image: downloadURL,
					});
				});
			}
		);
	};

	const modal = (e) => {
		e.preventDefault();
		Swal.fire({
			imageUrl: newShop.image,
			imageAlt: "A tall image",
		});
	};

	const deleteImagen = (e) => {
		e.preventDefault();
		const desertRef = ref(storage, `files/${nameI}`);

		deleteObject(desertRef)
			.then(() => {
				Swal.fire({
					icon: "success",
					title: "Éxito",
					text: `Se quito la imagen.`,
				}).then((r) => {
					if (r.isConfirmed) {
						setNameI("");
						setProgress(0);
						setNewShop({
							...newShop,
							image: "",
						});
					}
				});
			})
			.catch((error) => {
				console.log(error);
				Swal.fire({
					icon: "warning",
					title: "Error",
					text: `Hubo un error.`,
				});
			});
	};

	return (
		<>
			{cargando ? (
				<Loading />
			) : (
				<div className={`${"h-screen"} ${Styles.bg}`}>
					<div className={` ${"md:grid md:grid-cols-3 md:gap-6"}`}>
						<div className="h-fit  pt-3 pr-1 rounded-md pb-3 pl-3 md:mt-4 bg-orange-300 md:col-span-1">
							<div className="px-4 sm:px-0">
								<h3 className="text-lg  leading-6 text-gray-900 font-bold">
									Conviertete en Vendedor!
								</h3>
								<p className="mt-1 text-sm text-white-700 font-bold">
									Registra tu tienda y se parte la comunidad de vendedores de
									Humblefood.
								</p>
							</div>
						</div>
						<div className="my-5 md:mt-4 md:col-span2">
							<form onSubmit={(e) => handleformSubmit(e)}>
								<div className="shadow sm:rounded-md sm:overflow-hidden">
									<div className="px-4 py-5 bg-gray-200 space-y-6 sm:p-6">
										{/* Direccion */}

										<div className="mt-5 flex flex-col justify-around font-bold">
											<p> Verificar direccion con google maps: </p>
											<Link to="/createShop/map">
												<button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="icon icon-tabler icon-tabler-map-2"
														width="32"
														height="32"
														viewBox="0 0 24 24"
														strokeWidth="2"
														stroke="#00b341"
														fill="none"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path stroke="none" d="M0 0h24v24H0z" fill="none" />
														<line x1="18" y1="6" x2="18" y2="6.01" />
														<path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5" />
														<polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15" />
														<line x1="9" y1="4" x2="9" y2="17" />
														<line x1="15" y1="15" x2="15" y2="20" />
													</svg>
												</button>
											</Link>

										</div>
										{/* Nombre de la tienda */}
										<div className="">
											<div className="w-full col-span-3 sm:col-span-2">
												<label className="font-bold block text-md  text-gray-700">
													{" "}
													Nombre de la tienda:{" "}
												</label>
												<div className="mt-1 flex rounded-md shadow-sm">
													<input
														onChange={(e) => handleInputChange(e)}
														type="text"
														name="name"
														className="h-10 text-xl pl-4 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-solid border-indigo-200 border-2"
														placeholder="Ej: Panaderia Rosalba"
													// required
													/>
												</div>
												<div className="text-rose-800 font-bold">
													{err.name && <p>{err.name}</p>}
												</div>
											</div>
										</div>
										{/* Descripcion */}
										<div>
											<label className="font-bold block text-md  text-gray-700">
												Descripcion de la tienda:{" "}
											</label>
											<div className="mt-1">
												<textarea
													onChange={(e) => handleInputChange(e)}
													name="description"
													rows="3"
													className="shadow-sm p-4 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-solid border-indigo-200 border-2 rounded-md resize-none"
													placeholder="Ej: Panadaria y pasteleria con mas de 20 años de experiencia en el mercado..."
												></textarea>
												<div className="text-rose-800 font-bold">
													{err.description && <p>{err.description}</p>}
												</div>
											</div>
										</div>

										{/* Correo asociado al paypal*/}
										<div className="col-span-3 sm:col-span-2">
											<label className="font-bold block text-md  text-gray-700">
												{" "}
												Correo de la tienda Asociado a Paypal:{" "}
											</label>
											<div className="mt-1 flex rounded-md shadow-sm">
												<input
													onChange={(e) => handleInputChange(e)}
													type="email"
													name="email"
													className="h-10 pl-4 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-solid border-indigo-200 border-2"
													placeholder="Ej: tienda123@gmail.com"
												/>

											</div>
											<div className="text-rose-800 font-bold">
												{err.email && <p>{err.email}</p>}
											</div>
										</div>
										{/* Imagen */}
										{newShop.image === "" ? (
											<>
												<div className="col-span-6 sm:col-span-6">
													<div className="flex flex-col">
														<label className="font-bold">Imagen</label>
														<label className="text-red-500 font-bold">
															(Nota: Sólo podés subir una imagen.)
														</label>
														<input
															type="file"
															className="w-full"
															onChange={(e) => handleImagen(e)}
														/>
														{progress !== 0 ? (
															<h2>Subiendo archivo {progress}%</h2>
														) : null}
													</div>
												</div>
											</>
										) : (
											<div className="flex flex-col">
												<label className="font-bold mb-2">Imagen</label>
												<div className="flex justify-center">
													<img
														src={newShop.image}
														alt="product"
														className="h-10 w-10 rounded-lg cursor-pointer"
														onClick={(e) => modal(e)}
													/>
													<button onClick={(e) => deleteImagen(e)}>
														<MdDelete className="ml-4 text-red-600" />
													</button>
												</div>
											</div>
										)}
									</div>
									<div className="flex justify-between px-4 py-1.5 bg-gray-200 text-right sm:px-6">
										<ButtonExit
											text="Volver al panel de usuario"
											ruta={`/settings/${user?.sub.split("|")[1]}`}
											className="mt-4 bg-red-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md"
										/>
										<button
											type="submit"
											className="my-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
										>
											Registrar
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CreateShop;