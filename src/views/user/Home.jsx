import React, { useEffect, useState } from "react";
import Nav from "../../components/nav/Nav";
import Cards from "../../components/cards/Cards";
import Loading from "../../components/loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { getallproducts, getProductShop, getShopsId, postnewUser } from "../../redux/actions";
import { Paginado } from "../../components/paginado/Paginado";
import Carousell from "../../components/carousell/Carousell";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Home = ({
  cartItems,
  getTotalItems,
  handleAddToCart,
  handleRemoveFromCart,
  handleDeleteFromCart,
}) => {
  const dispatch = useDispatch();
  const { products, next, prev, pagesTotal } = useSelector(
    (state) => state.productShop
  )
  // const { products, next, prev, pagesTotal } = useSelector(
  //   (state) => state.productsloaded
  // );

  const { shopId } = useParams()

  console.log(shopId)
  const loading = useSelector((state) => state.isLoading);
  // const { products, next, prev, pagesTotal } = useSelector(state => state.productsloaded);
  const cargando = useSelector(state => state.isLoading)
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
    dispatch(getProductShop(shopId));
  }, [dispatch, shopId]);
  console.log(products)

  return (
    <div>

      {loading ? (
        <Loading />
      ) :
        (
          <>
            <Nav
              cartItems={cartItems}
              getTotalItems={getTotalItems}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleDeleteFromCart={handleDeleteFromCart}
            />
            {/* <div class="bg-cover bg-center  h-auto text-white py-24 px-10 object-fill"  >
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEFYhBX8x6VsbZ8JkkkRu-uSxm1CSkCUfz6Qusqp=CAU' />
              <div class="md:w-1/2">
                <p class="font-bold text-sm uppercase">Services</p>
                <p class="text-3xl font-bold">Multimedia products</p>
                <p class="text-2xl mb-10 leading-none">Atractive designs for your brand</p>
                <a href="#" class="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800">Contact us</a>
              </div>
            </div> */}
            <div class="bg-gray-600">
              <div class="lg:grid lg:grid-cols-2">
                <div class="py-10 px-10 lg:px-0 max-w-3xl lg:max-w-md mx-auto">
                  <h2 class="text-4xl tracking-tight font-extrabold text-gray-100">
                    <span class="block">Ready to dive in?</span>
                    <span class="block">Start your free trial today.</span>
                  </h2>
                  <p class="text-gray-300 mt-5">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </p>
                  <div class="inline-block shadow mt-5">
                    <a href="#" class="inline-block py-3 px-4 bg-white hover:bg-indigo-100 text-indigo-500 font-medium border border-transparent rounded-md">Sign up for free</a>
                  </div>
                </div>
                <div class="lg:relative lg:mt-16">
                  <img class="lg:absolute lg:inset-0 h-10 w-full lg:h-full object-cover object-center lg:rounded-tl-md" src="https://alfabetajuega.com/hero/2019/04/CJ-1.jpg?width=1200&aspect_ratio=1200:631" alt="Woman workcation on the beach" />
                </div>
              </div>
            </div>

            {/* <Carousell /> */}
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
        // {
        // cargando ? <Loading /> : <>
        //   <Nav
        //     cartItems={cartItems}
        //     getTotalItems={getTotalItems}
        //     handleAddToCart={handleAddToCart}
        //     handleRemoveFromCart={handleRemoveFromCart}
        //     handleDeleteFromCart={handleDeleteFromCart}
        //   />
        //   <Carousell />
        //   <Cards
        //     products={products}
        //     handleAddToCart={handleAddToCart}
        //     cartItems={cartItems}
        //   />
        //   <Paginado paging={paging} currentPage={currentPage} pagesTotal={pagesTotal} prev={prev} next={next} />
        // </>
      }
    </div >
  );
};

export default Home;
