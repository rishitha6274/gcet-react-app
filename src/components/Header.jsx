import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import '../App.css';

export default function Header() {
  const { user } = useContext(AppContext);
  // const isLoggedIn = user?.email && user?.token;

  return (
    <header>
      <h1>My React Store</h1>
      <nav>
        <Link to="/"><i className="fas fa-home"></i> Home</Link>
        <Link to="/cart"><i className="fas fa-shopping-cart"></i> Cart</Link>
       <Link to="/orders"><i className="fas fa-box"></i> Your Orders</Link>
        {user.token ? (
        <>
          {user.role === "admin" && <Link to="/admin">Admin</Link>}-
          <Link to="/logout">Logout</Link>
        </>
      ) : (
        <Link to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link>
      )}
      </nav>
    </header>
  );
}
