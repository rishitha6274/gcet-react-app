import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios"; 
import '../App.css';
import './Product.css'

export default function Product() {
  const { user, cart, setCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      console.log(API)
      // const res = await axios.get(`https://gcet-node-app-nine.vercel.app/products`);
      const res = await axios.get(`${API}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const addToCart = (product) => {
  const existingProductIndex = cart.findIndex(p => p._id === product._id);
  if (existingProductIndex !== -1) {
    const newCart = [...cart];
    newCart[existingProductIndex].quantity = (newCart[existingProductIndex].quantity || 1) + 1;
    setCart(newCart);
  } else {
    setCart(prev => [...prev, { ...product, quantity: 1 }]);
  }
};


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="form-container">
      {user && <h2 className="form-title">Welcome, {user.name}!</h2>}
      <p style={{ color: "#d86c7a" }}> Product List</p><br /> 

      <div className="product-container">
  {products.map(product => (
    <div key={product._id} className="product-card">
      <h4>{product.name}</h4> <h5>{product.description}</h5> <img src={product.imgUrl} alt={product.name} style={{ width: "200px", height: "auto" }} />

      <p>₹{product.price}</p>
      <button onClick={() => addToCart(product)}>  <i className="fas fa-cart-plus"></i> Add to Cart</button>
    </div>
  ))}
</div>
    </div>
  );
}
