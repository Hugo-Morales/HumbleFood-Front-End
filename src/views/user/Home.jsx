import React, { useEffect, useState } from "react";
import Nav from "../../components/nav/Nav";
import Cards from "../../components/cards/Cards";
import Loading from '../../components/loading/Loading';
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { getallproducts } from "../../redux/actions";
import { Paginado } from "../../components/paginado/Paginado";
import Carousell from "../../components/carousell/Carousell";

const Home = ({
  cartItems,
  getTotalItems,
  handleAddToCart,
  handleRemoveFromCart,
  handleDeleteFromCart,
}) => {
  const dispatch = useDispatch();
  const { products, next, prev, pagesTotal } = useSelector(state => state.productsloaded);
  const loading = useSelector(state => state.isLoading)
  const { isLoading } = useAuth0();
  const [currentPage, setCurrentPage] = useState(0);
  console.log(products);

  const paging = (num) => {
    if (num >= 0 && num <= pagesTotal) {
      setCurrentPage(num);
    }
  };

  useEffect(() => {
    dispatch(getallproducts(currentPage));
  }, [dispatch, currentPage]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Nav
        cartItems={cartItems}
        getTotalItems={getTotalItems}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleDeleteFromCart={handleDeleteFromCart}
      />
      <Carousell />
      {
        loading ? <Loading /> : <>
          <Cards
            products={products}
            handleAddToCart={handleAddToCart}
            cartItems={cartItems}
          />
          <Paginado paging={paging} currentPage={currentPage} pagesTotal={pagesTotal} prev={prev} next={next} />
        </>
      }
    </div>
  );
};

export default Home;
