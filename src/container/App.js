import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Productos from "../views/productos/Productos";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/products/:id" element={<Productos/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;