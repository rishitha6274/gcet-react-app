import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register"; 

export const AppContext = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null); 

  return (
    <AppContext.Provider value={{ users, setUsers, user, setUser }}>
      <BrowserRouter>
        <header>
          <h1>React Store</h1>
          <Link to="/">Home</Link> -
          <Link to="/cart">Cart</Link> -
          <Link to="/login">Login</Link>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2005. All rights Reserved.</p>
        </footer>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
