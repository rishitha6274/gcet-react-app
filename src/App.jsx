import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Product from "./components/Product";
import Cart from "./components/Cart";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
     <div>
       <BrowserRouter>
         <Router>
           <header>
            <h1>React Store</h1>
            <link to="/">Home</link>
            <link to="/cart">Cart</link>
            <hr />
           </header>
           <main>
            <Routes>
              <Route index element={<Product/>}/>
              <Route path="/" element={<Product/>}></Route>
              <Route path="/cart" element={<Cart/>}></Route>
            </Routes>
           </main>
           <footer>
            <hr />
            &copy; 2025 All rights Reserved.
           </footer>
         </Router>
       </BrowserRouter>
     </div>
    </>
  )
}

export default App
