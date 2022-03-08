import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardDetail from "../views/CardDetails";
import Error404 from "../views/Error 404/error";
import Home from "../views/Home";
import LandingPage from "../views/landingpage/landing";
import CreateProduct from "../views/createProducts";
import { Helmet } from "react-helmet";
function App() {
  const [cartItems, setCartItems] = useState([]);

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
  };

  return (
    <BrowserRouter>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Humblefood</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Helmet application" />
      </Helmet>
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
          <Route exact path="/products/:id" element={<CardDetail handleAddToCart={handleAddToCart} />}></Route>
          <Route exact path='/tienda/:idTienda/create' element={<CreateProduct />}></Route>
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
