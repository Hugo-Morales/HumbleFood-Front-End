import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getallproducts, postnewUser } from "../../redux/actions";
import Nav from "../../components/nav/Nav";
import Cards from "../../components/cards/Cards";
import Loading from "../../components/loading/Loading";
import Paginado from "../../components/paginado/Paginado";
import Carousell from "../../components/carousell/Carousell";

const Home = ({
  cartItems,
  getTotalItems,
  handleAddToCart,
  handleRemoveFromCart,
  handleDeleteFromCart,
}) => {
  const dispatch = useDispatch();
  const { products, next, prev, pagesTotal } = useSelector(
    (state) => state.productsloaded
  );

  const cargando = useSelector((state) => state.isLoading);
  const [currentPage, setCurrentPage] = useState(0);
  const { isAuthenticated, user } = useAuth0();
  // console.log(products);

  const paging = (num) => {
    if (num >= 0 && num <= pagesTotal) {
      setCurrentPage(num);
    }
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
    dispatch(getallproducts(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div>
      {cargando ? (
        <Loading />
      ) : (
        <>
          <Nav
            cartItems={cartItems}
            getTotalItems={getTotalItems}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
            handleDeleteFromCart={handleDeleteFromCart}
          />
          <Carousell />
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
