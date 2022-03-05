import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardDetail from "../views/CardDetails";
import Home from "../views/Home";

function App() {
  const [cartItems, setCartItems] = useState([
    {
      id: 0,
      nombre: "Hola",
      restaurante: "MC Donals",
      precio: "2",
      descuento: "10",
      image:
        "http://c.files.bbci.co.uk/DBBF/production/_105055265_bandejapaisa.jpg",
      stock: 10,
      amount: 1,
    },
    {
      id: 1,
      nombre: "Hamburguesa",
      restaurante: "Coto",
      precio: "5",
      descuento: "123",
      image:
        "https://static-sevilla.abc.es/media/gurmesevilla/2012/01/comida-rapida-casera.jpg",
      stock: 7,
      amount: 1,
    },
    {
      id: 2,
      nombre: "Hamburguesa",
      restaurante: "Dia",
      precio: "5",
      descuento: "50",
      image:
        "https://static-sevilla.abc.es/media/gurmesevilla/2012/01/comida-rapida-casera.jpg",
      stock: 12,
      amount: 1,
    },
  ]);

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

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                getTotalItems={getTotalItems}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                cartItems={cartItems}
              />
            }
          ></Route>
          <Route exact path="/productos/:id" element={<CardDetail />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
