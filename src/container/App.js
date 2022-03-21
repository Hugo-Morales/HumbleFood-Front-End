import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import CardDetail from "../views/user/CardDetails";
import Error404 from "../views/Error 404/error";
import Home from "../views/user/Home";
import LandingPage from "../views/landingpage/landing";
import SendReview from "../views/user/SendReview";
import PrivateShop from "../routes/PrivateShop";
import PrivateRoute from "../routes/PrivateRoute";
import ShoppingList from "../components/cart/Cart";
import NewCategory from "../components/category/NewCategory";
import Favorites from "../components/shops/Favorites";
import HomeShops from "../views/user/HomeShops";
import DirectionMap from "../views/seller/createNewShop/directionMap";
import Loading from "../components/loading/Loading";
import { getdataUser } from "../redux/actions/index";

function App() {
  const dispatch = useDispatch();
  const { isLoading, user } = useAuth0();
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);
  const dataUser = useSelector((state) => state.dataUser);
  const userId = user?.sub.split("|")[1];

  useEffect(() => {
    if (cartItems.length !== 0) localStorage.setItem("carrito", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("carrito"));

    if (items) setCartItems(items);
    dispatch(getdataUser(userId));
  }, [dispatch, userId]);

  const getTotalItems = (items) => {
    return items.reduce((acc, item) => acc + item.amount, 0);
  };

  const handleAddToCart = (clickedItem) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? {
                ...item,
                amount:
                  item.amount < item.stock ? item.amount + 1 : item.amount,
              }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    if (cartItems.length === 1) localStorage.removeItem("carrito");

    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [])
    );
  };

  const handleDeleteFromCart = (id) => {
    // const items = JSON.parse(localStorage.getItem("carrito"));
    if (cartItems.length === 1) localStorage.removeItem("carrito");
  
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (isLoading) return <Loading />;

  return (
    <BrowserRouter>
      <div className="App">
        {dataUser?.rol !== 3 ? (
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/home" element={<HomeShops />} />
            <Route
              exact
              path="/productShop/:shopId"
              element={
                <Home
                  open={open}
                  setOpen={setOpen}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  getTotalItems={getTotalItems}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleDeleteFromCart={handleDeleteFromCart}
                />
              }
            />
            <Route
              exact
              path="/products/:shopId/:productId"
              element={
                <CardDetail
                  open={open}
                  setOpen={setOpen}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  getTotalItems={getTotalItems}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleDeleteFromCart={handleDeleteFromCart}
                />
              }
            />
            <Route
              exact
              path="/shopping-list"
              element={<ShoppingList cartItems={cartItems} />}
            />
            <Route exact path="/settings/:userId" element={<PrivateRoute />} />
            <Route exact path="/category" element={<NewCategory />} />
            <Route exact path="/createShop" element={<PrivateShop />} />
            <Route
              exact
              path="/send-review/:productId"
              element={<SendReview />}
            />
            <Route exact path="/favorites" element={<Favorites />} />
            <Route exact path="/createShop/map" element={<DirectionMap />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        ) : (
          <Error404 />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
