import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { setUser } = useContext(AppContext); 
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API}/users/login`;
      const found = await axios.post(url, { email, pass });

      const { user, token } = found.data;

      if (user && token) {
  setUser({ ...user, token }); 
  Navigate("/");
}
 else {
        setMsg("Invalid User or Password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMsg("Login failed. Try again.");
    }
  };

  const goToRegister = () => {
    Navigate("/register");
  };

  return (
    <div className="login-section">
      <div className="login-box">
        <h3><i className="fas fa-user"></i> Login</h3>
        {msg && <p style={{ color: "red" }}>{msg}</p>}
        <p>
          <input
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </p>
        <div className="btn-group">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={goToRegister}>Create Account</button>
        </div>
      </div>
    </div>
  );
}
