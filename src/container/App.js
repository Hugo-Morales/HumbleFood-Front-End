import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardDetail from "../views/user/CardDetails";
import Error404 from "../views/Error 404/error";
import Home from "../views/user/Home";
import LandingPage from "../views/landingpage/landing";
import SendReview from "../views/user/SendReview";
import PrivateShop from "../routes/PrivateShop";
import PrivateRoute from "../routes/PrivateRoute";
import ShoppingList from "../components/cart/Cart";
import ContainerT from "../views/TiendaPanel/ContainerT";
// import { Helmet } from "react-helmet";
import NewCategory from "../components/category/NewCategory";
import CreateProduct from "../views/TiendaPanel/right/Create/CreateProducts";
// import Card from "../components/cards/Card";
import HomeShops from "../views/user/HomeShops";

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (cartItems.length !== 0)
      localStorage.setItem("carrito", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("carrito"));

    if (items) setCartItems(items);
  }, []);

  const getTotalItems = (items) => {
    return items.reduce((acc, item) => acc + item.amount, 0);
  };

  const handleAddToCart = (clickedItem) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    const items = JSON.parse(localStorage.getItem("carrito"));
    if (items.length === 1) localStorage.removeItem("carrito");

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
    setCartItems((prev) => prev.filter((item) => item.id !== id));

    const items = JSON.parse(localStorage.getItem("carrito"));
    if (items.length === 1) localStorage.removeItem("carrito");
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<HomeShops />}></Route>
          <Route
            exact
            path="/productShop/:shopId"
            element={
              <Home
                cartItems={cartItems}
                getTotalItems={getTotalItems}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleDeleteFromCart={handleDeleteFromCart}
              />
            }
          />
          <Route exact path="/createShop" element={<PrivateShop />} />
          <Route
            exact
            path="/products/:id"
            element={<CardDetail handleAddToCart={handleAddToCart} />}
          />
          <Route
            exact
            path="/shopping-list"
            element={<ShoppingList cartItems={cartItems} />}
          />
          <Route
            exact
            path="/send-review/:productId"
            element={<SendReview />}
          />
          <Route exact path="/settings/:userId" element={<PrivateRoute />} />
          <Route path="*" element={<Error404 />} />

          <Route
            exact
            path="/products/:id"
            element={<CardDetail handleAddToCart={handleAddToCart} />}
          ></Route>
          <Route
            exact
            path="/products/:id"
            element={<CardDetail handleAddToCart={handleAddToCart} />}
          ></Route>
          <Route exact path="/create" element={<CreateProduct />}></Route>
          <Route exact path="/category" element={<NewCategory />}></Route>
          {/* <Route exact path="/tienda/:idTienda" element={<ContainerT/>}> </Route> */}

          <Route path="*" element={<Error404 />}></Route>
          <Route exact path="/tienda/:idTienda" element={<ContainerT />} />
          <Route exact path="/createShop" element={<PrivateShop />} />
          <Route
            exact
            path="/send-review/:productId"
            element={<SendReview />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
