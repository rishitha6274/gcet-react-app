import React, { useContext, useState } from "react";
import { AppContext } from "../App"; 
import { useNavigate } from "react-router-dom";
import '../App.css';

export default function Login() {
  const { users, setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setUser(user);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  return (
    <div className="form-container">
      <h3 className="form-title">Login</h3>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Submit</button>

      
      <button
        style={{ marginTop: "12px", backgroundColor: "#f9dcdc", color: "#d86c7a" }}
        onClick={handleCreateAccount}
      >
        Create Account
      </button>
    </div>
  );
}
