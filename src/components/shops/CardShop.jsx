import { Link } from "react-router-dom";


const CardShop = ({ shop }) => {
  const { id, name, image, description } = shop;

  return (
    <>
      <div className="flex justify-center items-center w-full drop-shadow-4xl">
        <div className="w-full relative bg-white shadow-md h-96 mx-3 rounded-3xl  flex flex-col justify-around items-center overflow-hidden sm:flex-row sm:h-52 sm:w-11/12 md:w-96">
          <img
            className="relative h-1/2 w-full sm:h-full sm:w-1/2 object-cover"
            src={image}
            alt="comida"
          />
          <button className="absolute bg-gray-700 mr-5 text-white px-3 py-1 rounded-sm shadow-md top-0 left-0">
            ✰
          </button>
          <div className=" flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2">
            <div className="flex flex-col justify-start items-baseline">
              <Link to={`/productShop/${id}`}>
                <h1 className="text-lg font-normal mb-0 text-gray-600 font-sans">
                  {name}
                </h1>
              </Link>
            </div>
            <p className="text-xs text-gray-500 w-4/5">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardShop;
