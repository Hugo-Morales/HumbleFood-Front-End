const Card = ({ prop }) => {
    const { nombre, precio, descuento, restaurante, image } = prop;

    return (
        // <div classNameName="">
        //     <div>{nombre}</div>
        //     <img src={image} alt="i" />
        //     <div>precio=${precio}</div>
        //     <div>{descuento}% Off</div>

        //     <div><button>Comprar</button></div>
        //     <div><button>✰</button></div>
        // </div>
        <div className="flex justify-center items-center w-full">
            <div className="relative bg-white shadow-md h-96 mx-3 rounded-3xl  flex flex-col justify-around items-center overflow-hidden sm:flex-row sm:h-52 sm:w-3/5 md:w-96" >
                <img className="relative h-1/2 w-full sm:h-full sm:w-1/2 object-cover" src={image} alt="comida" />
                <button className="absolute bg-gray-700 mr-5 text-white px-3 py-1 rounded-sm shadow-md top-0 left-0">✰</button>
                <div className=" flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2">
                    <div className="flex flex-col justify-start items-baseline">
                        <h1 className="text-lg font-normal mb-0 text-gray-600 font-sans">
                            {nombre}
                        </h1>
                        <span className="text-xs text-indigo-300 mt-0">{restaurante}</span>
                    </div>
                    <p className="text-xs text-gray-500 w-4/5">
                        Ergonimical for human body curv
                    </p>
                    <div className="w-full flex flex-col">
                        <div className="w-full flex justify-end items-center pr-5 pb-1">
                            <h1 className="font-bold text-green-500">{descuento}% OFF</h1>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <h1 className="font-bold text-gray-500">${precio}</h1>
                            <button className="bg-gray-700 mr-5 text-white px-3 py-1 rounded-sm shadow-md">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;