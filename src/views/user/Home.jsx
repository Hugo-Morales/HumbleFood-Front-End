import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import {
  getProductShop,
  getShopsId,
  postnewUser,
  getShops,
} from "../../redux/actions";
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
    (state) => state.productShop
  );
  const shop = useSelector((state) => state.shop);
  const shops = useSelector((state) => state.shops);
  console.log(shop, "shop");
  const loading = useSelector((state) => state.isLoading);
  const [currentPage, setCurrentPage] = useState(0);
  const { isAuthenticated, user } = useAuth0();
  // console.log(shop.email);
  // console.log("shop", shop);

  const paging = (num) => {
    if (num >= 0 && num <= pagesTotal) setCurrentPage(num);
  };

  const newUser = {
    userId: user?.sub.split("|")[1],
    name: user?.name,
    name_user: user?.nickname,
    email: user?.email,
    direction: "",
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(postnewUser(newUser));
    }
  });

  useEffect(() => {
    dispatch(getShopsId(shopId));
    dispatch(getProductShop(shopId, currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, shopId, currentPage]);

  console.log("shopshop", shop);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Nav
            cartItems={cartItems}
            shopEmail={shop.email}
            getTotalItems={getTotalItems}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
            handleDeleteFromCart={handleDeleteFromCart}
          />

          <div className="bg-gray-600">
            <div className="lg:grid lg:grid-cols-2">
              <div className="py-10 px-10 lg:px-0 max-w-3xl lg:max-w-md mx-auto">
                <h2 className="text-4xl tracking-tight font-extrabold text-gray-100">
                  <span className="block">Ready to dive in?</span>
                  <span className="block">Start your free trial today.</span>
                </h2>
                <p className="text-gray-300 mt-5">{shops.shops.description}</p>
                <div className="inline-block shadow mt-5">
                  <ButtonExit
                    text="Volver a ver mas tiendas"
                    ruta="/home"
                    className="mt-4 bg-red-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full"
                  />
                </div>
              </div>
              <div className="lg:relative lg:mt-16">
                <img
                  className="lg:absolute lg:inset-0 h-10 w-full lg:h-full object-cover object-center lg:rounded-tl-md"
                  src="https://alfabetajuega.com/hero/2019/04/CJ-1.jpg?width=1200&aspect_ratio=1200:631"
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
      )}
    </div>
  );
};

export default Home;
