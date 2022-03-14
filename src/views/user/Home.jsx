import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductShop, getShopsId, loading } from "../../redux/actions";
import Nav from "../../components/nav/Nav";
import Cards from "../../components/cards/Cards";
import Loading from "../../components/loading/Loading";
import Paginado from "../../components/paginado/Paginado";
import ButtonExit from "../../../src/components/buttonExit/buttonexit";

const Home = ({
  cartItems,
  setCartItems,
  getTotalItems,
  handleAddToCart,
  handleRemoveFromCart,
  handleDeleteFromCart,
}) => {
  const { shopId } = useParams();
  const dispatch = useDispatch();
  const { products, next, prev, pagesTotal } = useSelector(
    (state) => state.productsloaded
  );
  // const shops = useSelector((state) => state.shops);
  const shop = useSelector((state) => state.shop);
  const [currentPage, setCurrentPage] = useState(0);
  const cargando = useSelector((state) => state.isLoading);

  const paging = (num) => {
    if (num >= 0 && num <= pagesTotal) setCurrentPage(num);
  };

  useEffect(() => {
    dispatch(loading());
    dispatch(getShopsId(shopId));
    dispatch(getProductShop(shopId, currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, shopId, currentPage]);

  console.log("productos por categoría", products);

  return (
    <div>
      {
        cargando ? (
          <Loading />
        ) : (
          <>
            <Nav
              cartItems={cartItems}
              setCartItems={setCartItems}
              shopEmail={shop.email}
              getTotalItems={getTotalItems}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleDeleteFromCart={handleDeleteFromCart}
            />
            <div className="bg-gray-500">
              <div className="lg:grid lg:grid-cols-2">
                <div className="py-10 px-10 lg:px-0 max-w-3xl lg:max-w-md mx-auto font-bold 	font-weight: 700">
                  <h2 className="text-4xl tracking-tight font-extrabold text-gray-100">
                    <span className="block">{shop.name}</span>
                  </h2>
                  <p className="text-gray-300 mt-5">{shop.description}</p>

                  <ButtonExit
                    text="Volver a ver mas tiendas"
                    ruta="/home"
                    className="mt-4 bg-red-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full"
                  />
                </div>
                <div className="lg:relative lg:mt-16">
                  <img
                    className="lg:absolute lg:inset-0 h-10 w-full lg:h-full object-cover object-center lg:rounded-tl-md"
                    src={shop.image}
                    alt="Woman workcation on the beach"
                  />
                </div>
              </div>
            </div>

            {/* <InformacionShop /> */}
            <Cards
              products={products}
              handleAddToCart={handleAddToCart}
              cartItems={cartItems}
            />
            <Paginado
              paging={paging}
              currentPage={currentPage}
              pagesTotal={pagesTotal}
              prev={prev}
              next={next}
            />
          </>
        )
      }
    </div>
  );
};

export default Home;
