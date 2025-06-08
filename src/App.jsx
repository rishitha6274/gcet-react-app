import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Orders from "./components/Orders";
import Admin from "./components/Admin";

export const AppContext = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]); 

  return (
    <AppContext.Provider value={{ users, setUsers, user, setUser, cart, setCart }}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes index element={<Product />}>
            <Route path="/" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/admin" element={<Admin />}></Route>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
