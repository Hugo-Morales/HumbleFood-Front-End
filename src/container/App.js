import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/login/Login";
import Register from "../views/login/Register";
import UserType from "../views/login/UserType";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<UserType />}></Route>
          <Route exact path="/register/:type" element={<Register />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
