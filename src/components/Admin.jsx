import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";

export default function Admin() {
  const { user, setUser } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    imgUrl: "",
    price: ""
  });

  const API = import.meta.env.VITE_API_URL;

  const fetchUsers = async () => {
    try {
      const url = `${API}/users/all`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const url = `${API}/products`;
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const handleUserDelete = async (id) => {
    const url = `${API}/users/${id}`;
    await axios.delete(url, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    fetchUsers();
  };

  const handleUserSubmit = async () => {
    try {
      const url = `${API}/users/register`;
      await axios.post(url, user);
      fetchUsers();
    } catch (err) {
      console.error("User registration failed", err);
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const handleProductSubmit = async () => {
    try {
      const url = `${API}/products/add`;
      await axios.post(url, productForm, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProductForm({ name: "", description: "", imgUrl: "", price: "" });
      fetchProducts();
    } catch (err) {
      console.error("Product add failed", err);
    }
  };

  const handleProductDelete = async (id) => {
    try {
      const url = `${API}/products/${id}`;
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error("Product delete failed", err);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <p>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Email address"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setUser({ ...user, pass: e.target.value })}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Role"
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        />
      </p>
      <button onClick={handleUserSubmit}>Submit</button>

      {users.map((u) => (
        <div key={u._id}>
          {u.name} - {u.email} - {u.role}
          <button onClick={() => handleUserDelete(u._id)}>Delete</button>
        </div>
      ))}

      <hr />
      <h2>Product Management</h2>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={productForm.name}
        onChange={handleProductChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={productForm.description}
        onChange={handleProductChange}
      />
      <input
        type="text"
        name="imgUrl"
        placeholder="Image URL"
        value={productForm.imgUrl}
        onChange={handleProductChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={productForm.price}
        onChange={handleProductChange}
      />
      <button onClick={handleProductSubmit}>Add Product</button>

      {products.map((p) => (
        <div key={p._id} style={{ marginTop: "10px" }}>
          <strong>{p.name}</strong> - ₹{p.price}
          <p>{p.description}</p>
          {p.imgUrl && <img src={p.imgUrl} alt={p.name} width="100" />}
          <br />
          <button onClick={() => handleProductDelete(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
