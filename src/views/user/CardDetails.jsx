import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import {
  getDetailProduct,
  reset,
  loading,
  getShopsId,
} from "../../redux/actions";
import Loading from "../../components/loading/Loading";
import Reviews from "../../components/reviews/Reviews";
import Cart from "../../components/cart/Cart";

const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 0px;
  top: 0px;
`;

const CardDetail = ({
  open,
  setOpen,
  getTotalItems,
  handleAddToCart,
  handleRemoveFromCart,
  handleDeleteFromCart,
  cartItems,
  setCartItems,
}) => {
  const dispatch = useDispatch();
  const spinner = useSelector((state) => state.isLoading);
  const products = useSelector((state) => state.detailProduct);
  const shop = useSelector((state) => state.shop);
  const { shopId, productId } = useParams([0]);

  const itemsPerShop = cartItems.filter((item) => item.shopId === shopId);

  // console.log("product", products);

  useEffect(() => {
    dispatch(loading());
    dispatch(getShopsId(shopId));
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
        <div>
          <Cart
            open={open}
            setOpen={setOpen}
            cartItems={cartItems}
            setCartItems={setCartItems}
            itemsPerShop={itemsPerShop}
            shopEmail={shop.email}
            getTotalItems={getTotalItems}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
            handleDeleteFromCart={handleDeleteFromCart}
          />
          <nav
            aria-label="Breadcrumb"
            className="flex justify-between w-full mt-4 h-12"
          >
            <ol className="max-w-2xl p-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8 bg-ochre rounded-r-md">
              <li>
                <div className="flex items-center">
                  <Link
                    to={`/productShop/${shopId}`}
                    className="flex items-center mr-2 text-sm font-bold text-white"
                  >
                    <IoIosArrowBack className="mr-2" />
                    Regresar
                  </Link>
                  <svg
                    width="16"
                    height="30"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-5 text-white"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li className="text-sm">
                <Link
                  to="#"
                  aria-current="page"
                  className="font-bold text-white"
                >
                  {" "}
                  {products?.name}{" "}
                </Link>
              </li>
            </ol>
            <div
              className={
                open ? "opacity-0" : "bg-emerald-400 rounded-full mr-4"
              }
            >
              <StyledButton onClick={() => setOpen(true)}>
                <Badge badgeContent={getTotalItems(itemsPerShop)} color="error">
                  <AddShoppingCartIcon />
                </Badge>
              </StyledButton>
            </div>
          </nav>
          <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
            <div className="xl:w-2/6 lg:w-2/5 w-80 md:block">
              <img
                src={products?.image}
                className="w-full"
                alt="fondo of a girl posing"
              />
              {/* <img
								className="mt-6 w-full"
								alt="fondo"
								src="https://i.ibb.co/qxkRXSq/component-image-two.png"
							/> */}
            </div>
            {/* <div className="md:hidden">
							<img
								className="w-full"
								alt="fondo of a girl posing"
								src="https://i.ibb.co/QMdWfzX/component-image-one.png"
							/>
							<div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
								<img
									src="https://i.ibb.co/cYDrVGh/Rectangle-245.png"
									alt="fondo-tag-one"
									className="md:w-48 md:h-48 w-full"
								/>
								<img
									src="https://i.ibb.co/f17NXrW/Rectangle-244.png"
									alt="fondo-tag-one"
									className="md:w-48 md:h-48 w-full"
								/>
								<img
									src="https://i.ibb.co/cYDrVGh/Rectangle-245.png"
									alt="fondo-tag-one"
									className="md:w-48 md:h-48 w-full"
								/>
								<img
									src="https://i.ibb.co/f17NXrW/Rectangle-244.png"
									alt="fondo-tag-one"
									className="md:w-48 md:h-48 w-full"
								/>
							</div>
						</div> */}
            <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
              <div className="border-b border-gray-200 pb-6">
                <p className="text-sm leading-none text-gray-600 dark:text-gray-300 ">
                  Balenciaga Fall Collection
                </p>
                <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-black mt-2">
                  {products?.name}
                </h1>

                <div className="mt-4 lg:mt-0 lg:row-span-3">
                  <div className="flex justify-between items-center">
                    <p className="text-3xl text-gray-900">${products?.price}</p>
                    <p className="text-3xl inline-block font-bold text-white p-2 bg-green-500 rounded-sm">
                      {products?.discount}
                      <span className="">% Descuento</span>
                    </p>
                  </div>
                </div>
                <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">
                  {products?.price}{" "}
                </h1>
              </div>

              <div>
                <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">
                  DESCRIPCION
                </h1>

                <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
                  {products?.description}
                </p>
              </div>
              <div></div>
              <button
                onClick={() => handleAddToCart(products)}
                type="submit"
                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rorate:45"
              >
                <p className="mr-3">Añadir</p>{" "}
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
              <div className="justify-start">
                <hr></hr>
                <Reviews />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CardDetail;
