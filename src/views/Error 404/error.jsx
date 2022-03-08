import { Link } from "react-router-dom";
import Styles from "../landingpage/landingpage.module.css";
const Error404 = () => {
    return (
        <div className={Styles.container}>
            <div className="px-40 py-20 bg-white rounded-md shadow-xl">
                <div className="flex flex-col items-center">

                    <h1 className="font-bold text-blue-600 text-9xl">404</h1>

                    <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                        <span className="text-red-500">Oops!</span> Page not found
                    </h6>

                    <p className="mb-8 text-center text-gray-500 md:text-lg">
                        The page you’re looking for doesn’t exist.
                    </p>

                    <Link to="/home">

                        <div href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-indigo-700"> Go to Home </div>

                    </Link>
                </div>
            </div>
        </div>
    )

}
export default Error404;