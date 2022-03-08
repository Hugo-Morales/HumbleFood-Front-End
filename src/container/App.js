import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardDetail from "../views/user/CardDetails";
import Error404 from "../views/Error 404/error";
import Home from "../views/user/Home";
import LandingPage from "../views/landingpage/landing";
import CreateShop from "../views/seller/createNewShop/createShop";
import ContainerT from "../views/TiendaPanel/ContainerT";
import { Helmet } from "react-helmet";

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

    if (items.length === 1) {
      localStorage.removeItem("carrito");
    }

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

    if (items.length === 1) {
      localStorage.removeItem("carrito");
    }
  };

  return (
    <BrowserRouter>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>Humblefood</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Helmet application" />
      </Helmet> */}
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route
            exact
            path="/home"
            element={
              <Home
                cartItems={cartItems}
                getTotalItems={getTotalItems}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleDeleteFromCart={handleDeleteFromCart}
              />
            }
          ></Route>
          <Route exact path="/createShop" element={<CreateShop />}></Route>
          <Route
            exact
            path="/products/:id"
            element={<CardDetail handleAddToCart={handleAddToCart} />}
          ></Route>
          <Route exact path="/tienda/:idTienda" element={<ContainerT />}>
            {" "}
          </Route>

          <Route path="*" element={<Error404 />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
