import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { getDetailProduct, reset, loading } from "../../redux/actions";
import Loading from "../../components/loading/Loading";
import Reviews from "../../components/reviews/Reviews";

const CardDetail = ({ handleAddToCart }) => {
  const dispatch = useDispatch();
  const spinner = useSelector((state) => state.isLoading);
  const { products } = useSelector((state) => state.detailProduct);
  const { shopId, productId } = useParams([0]);

  console.log("shopId", products);

  useEffect(() => {
    dispatch(loading());
    dispatch(getDetailProduct(shopId, productId));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, productId, shopId]);

  return (
    <>
      {spinner ? (
        <Loading />
      ) : (
        // <div className="bg-white">
        //   <div className="pt-6">
        //     <nav aria-label="Breadcrumb">
        //       <ol className="max-w-2xl mx-auto p-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
        //         <li>
        //           <div className="flex items-center">
        //             <Link
        //               to={`/productShop/${shopId}`}
        //               className="flex items-center mr-2 text-sm font-medium text-gray-900"
        //             >
        //               <IoIosArrowBack className="mr-2" />
        //               Regresar
        //             </Link>
        //             <svg
        //               width="16"
        //               height="20"
        //               viewBox="0 0 16 20"
        //               fill="currentColor"
        //               xmlns="http://www.w3.org/2000/svg"
        //               aria-hidden="true"
        //               className="w-4 h-5 text-gray-300"
        //             >
        //               <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
        //             </svg>
        //           </div>
        //         </li>
        //         <li className="text-sm">
        //           <Link
        //             to="#"
        //             aria-current="page"
        //             className="font-medium text-gray-500 hover:text-gray-600"
        //           >
        //             {" "}
        //             {products?.name}{" "}
        //           </Link>
        //         </li>
        //       </ol>
        //     </nav>

        //     <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
        //       <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
        //         <img
        //           src={products?.image}
        //           alt="Two each of gray, white, and black shirts laying flat."
        //           className="w-full h-full object-center object-cover"
        //         />
        //       </div>
        //       {/* <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        //     <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
        //       <img
        //         src={detailProduct? detailProduct.image2}
        //         alt="Model wearing plain black basic tee."
        //         className="w-full h-full object-center object-cover"
        //       />
        //     </div>
        //     <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
        //       <img
        //         src={data[id].image3}
        //         alt="Model wearing plain gray basic tee."
        //         className="w-full h-full object-center object-cover"
        //       />
        //     </div>
        //   </div>
        //   <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
        //     <img
        //       src={data[id].image4}
        //       alt="Model wearing plain white basic tee."
        //       className="w-full h-full object-center object-cover"
        //     />
        //   </div> */}
        //     </div>

        //     <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        //       <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        //         <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
        //           {products?.name}
        //         </h1>
        //       </div>

        //       <div className="mt-4 lg:mt-0 lg:row-span-3">
        //         {/* <h2 className="sr-only"></h2> */}
        //         <div className="flex justify-between items-center">
        //           <p className="text-3xl text-gray-900">${products?.price}</p>
        //           <p className="text-3xl inline-block font-bold text-white p-2 bg-green-500 rounded-sm">
        //             {products?.discount}
        //             <span className="">% Off</span>
        //           </p>
        //         </div>

        //         <form className="mt-10">
        //           {/* <h2 className="sr-only"></h2> */}

        //           <button
        //             onClick={() => handleAddToCart(products)}
        //             type="submit"
        //             className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rorate:45"
        //           >
        //             Add to cart
        //           </button>
        //         </form>
        //       </div>

        //       <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        //         <div>
        //           <h3 className="sr-only">Description</h3>

        //           <div className="space-y-6">
        //             <p className="text-base text-gray-900">
        //               {/* {detailProduct?.description} */}
        //             </p>
        //           </div>
        //         </div>

        //         <div className="mt-10">
        //           <h2 className="text-xl font-bold text-gray-900">
        //             Detalle del producto
        //           </h2>

        //           <div className="mt-4 space-y-6">
        //             <p className="text-md text-gray-600">
        //               {products?.description}
        //             </p>
        //           </div>
        //         </div>
        //       </div>
        //       <div className="justify-start">
        //         <hr></hr>
        //         <Reviews />
        //       </div>
        //     </div>
        //   </div>
        // </div>

        <div class="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
          <div class="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
            <img class="w-full" alt="image of a girl posing" src={products?.image} />
            <img class="mt-6 w-full" alt="image of a girl posing" src="https://i.ibb.co/qxkRXSq/component-image-two.png" />
          </div>
          <div class="md:hidden">
            <img class="w-full" alt="image of a girl posing" src="https://i.ibb.co/QMdWfzX/component-image-one.png" />
            <div class="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
              <img alt="image-tag-one" class="md:w-48 md:h-48 w-full" src="https://i.ibb.co/cYDrVGh/Rectangle-245.png" />
              <img alt="image-tag-one" class="md:w-48 md:h-48 w-full" src="https://i.ibb.co/f17NXrW/Rectangle-244.png" />
              <img alt="image-tag-one" class="md:w-48 md:h-48 w-full" src="https://i.ibb.co/cYDrVGh/Rectangle-245.png" />
              <img alt="image-tag-one" class="md:w-48 md:h-48 w-full" src="https://i.ibb.co/f17NXrW/Rectangle-244.png" />
            </div>
          </div>
          <div class="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
            <div class="border-b border-gray-200 pb-6">
              <p class="text-sm leading-none text-gray-600 dark:text-gray-300 ">Balenciaga Fall Collection</p>
              <h1 class="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">{products?.name}</h1>

              <div className="mt-4 lg:mt-0 lg:row-span-3">
                <div className="flex justify-between items-center">
                  <p className="text-3xl text-gray-900">${products?.price}</p>
                  <p className="text-3xl inline-block font-bold text-white p-2 bg-green-500 rounded-sm">
                    {products?.discount}
                    <span className="">% Off</span>
                  </p>
                </div>
              </div>
              <h1 class="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">{products?.price} </h1>
            </div>

            <div class="py-4 border-b border-gray-200 flex items-center justify-between">
              <p class="text-base leading-4 text-gray-800 dark:text-gray-300">Size</p>
              <div class="flex items-center justify-center">


                <img class="dark:hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg2.svg" alt="next" />
                <img class="hidden dark:block" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg2dark.svg" alt="next" />
              </div>
            </div>

            <div>
              <h1 class="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">DESCRIPCION</h1>


              <p class="md:w-96 text-base leading-normal text-gray-600 dark:text-gray-300 mt-4">{products?.description}</p>
            </div>
            <div>

            </div>
            <button
              onClick={() => handleAddToCart(products)}
              type="submit"
              className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rorate:45"
            >
              Add to cart
            </button>
            <div className="justify-start">
              <hr></hr>
              <Reviews />
            </div>
          </div>
        </div>



      )}
    </>
  );
};
export default CardDetail;