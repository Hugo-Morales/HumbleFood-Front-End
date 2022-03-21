import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loading } from "../../redux/actions";
import logoHamburguesa from "../../img/logo.png";
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {
	const { loginWithRedirect } = useAuth0();
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(loading());
		};
	});

	return (
		<div className="relative bg-white overflow-hidden mr-19 ml-15 pb-11">
			<div className="max-w-7xl mx-auto">
				<div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
					<svg
						className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
						fill="currentColor"
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<polygon points="50,0 100,0 50,100 0,100" />
					</svg>

					<div className="relative pt-6 px-4 sm:px-6 lg:px-8">
						<nav
							className="relative flex items-center justify-between sm:h-10 lg:justify-start"
							aria-label="Global"
						>
							<div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
								<div className="flex items-center justify-between w-full md:w-auto">
									<img
										className="h-12 w-auto sm:h-15"
										src={logoHamburguesa}
										alt="landing"
									/>
								</div>
							</div>
						</nav>
					</div>

					<div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
						<div className="sm:text-center lg:text-left">
							<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl text-center">
								<span className="block xl:inline">Bienvenido a</span>{" "}
								<span className="block text-indigo-600 xl:inline">
									Humble Food!
								</span>
							</h1>
							<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-10 md:mb-20 md:text-xl lg:mx-0">
								<span className="text-lime-600 bg-lime-200 rounded">
									¡Es igual de bueno pero más barato!.
								</span>{" "}
								Anímate a pertenecer a la comunidad de Humble food: el mejor
								e-commerce de venta de comida y con la mejor visión. Puedes ser
								comprador o registrar tu tienda y empezar a vender.
							</p>
							<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
								<Link to="/home">
									<div className="rounded-md shadow">
										<button
											href="#"
											className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 md:py-4 md:text-lg md:px-10"
										>
											Empieza a descubrir...
										</button>
									</div>
								</Link>
								<div className="mt-3 sm:mt-0 sm:ml-3">
									<button
										onClick={() => loginWithRedirect()}
										href="#"
										className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
									>
										Registrate ya mismo!
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
				<img
					className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
					src="https://cdn.dribbble.com/users/3474264/screenshots/14875714/media/344416ee58d46220c2f131207bc5c5c6.png"
					alt="img not found :("
				/>
			</div>
		</div>
	);
};

export default LandingPage;
