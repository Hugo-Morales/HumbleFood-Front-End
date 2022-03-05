import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import CardDetail from "../views/CardDetails";
import LandingPage from "../views/landingpage/landing";

export const data = [
  {
    id: 0,
    nombre: "Milanesa",
    restaurante: "MC Donals",
    precio: "2",
    descuento: "10",
    image:
      "http://c.files.bbci.co.uk/DBBF/production/_105055265_bandejapaisa.jpg",
    image2:
      "https://www.paulinacocina.net/wp-content/uploads/2015/03/P1150541-e1439164269502.jpg",
    image3:
      "https://saborgourmet.com/wp-content/uploads/milanesa-napolitana-de-argentina-ingredientes.jpg",
    image4:
      "https://www.196flavors.com/wp-content/uploads/2020/03/milanesa-a-la-napolitana-1-FP.jpeg",
    stock: 10,
  },
  {
    id: 1,
    nombre: "Hamburguesa",
    restaurante: "Coto",
    precio: "5",
    descuento: "123",
    image:
      "https://static-sevilla.abc.es/media/gurmesevilla/2012/01/comida-rapida-casera.jpg",
    image2:
      "https://www.saborusa.com/wp-content/uploads/2019/10/Rompe-la-rutina-con-una-suculenta-hamburguesa-con-queso-Foto-destacada.png",
    image3:
      "https://www.cocinayvino.com/wp-content/uploads/2022/01/www.cocinayvino.com-cocinayvino-hamburguesa-leo-messi-por-hard-rock-cafe-e1642607850331-1200x900.jpg",
    image4:
      "https://gourmetdemexico.com.mx/wp-content/uploads/2021/05/dia-de-la-hamburguesa.jpg",
    stock: 7,
  },
  {
    id: 2,
    nombre: "Hamburguesa",
    restaurante: "Dia",
    precio: "5",
    descuento: "50",
    image:
      "https://static-sevilla.abc.es/media/gurmesevilla/2012/01/comida-rapida-casera.jpg",
    image2:
      "https://www.saborusa.com/wp-content/uploads/2019/10/Rompe-la-rutina-con-una-suculenta-hamburguesa-con-queso-Foto-destacada.png",
    image3:
      "https://www.cocinayvino.com/wp-content/uploads/2022/01/www.cocinayvino.com-cocinayvino-hamburguesa-leo-messi-por-hard-rock-cafe-e1642607850331-1200x900.jpg",
    image4:
      "https://gourmetdemexico.com.mx/wp-content/uploads/2021/05/dia-de-la-hamburguesa.jpg",
    stock: 12,
  },
];

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
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route
            exact
            path="/home"
            element={
              <Home
                data={data}
                cartItems={cartItems}
                getTotalItems={getTotalItems}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleDeleteFromCart={handleDeleteFromCart}
              />
            }
          ></Route>

          {/* <Route exact path="/productos/:id" element={<CardDetail />}></Route> */}

          <Route exact path="/products/:id" element={<CardDetail />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
