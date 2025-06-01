import React, { useContext } from "react";
import { AppContext } from "../App"; 
import '../App.css';


export default function Product() {
  const { user } = useContext(AppContext);

  return (
    <div className="form-container">
      {user && <h2 className="form-title">Welcome, {user.name}!</h2>}
      <p style={{ color: "#d86c7a" }}>Product List</p>
    </div>
  );
}
