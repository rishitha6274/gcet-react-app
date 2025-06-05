import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { user = {}, setUser } = useContext(AppContext); 
  const [msg, setMsg] = useState();
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API}/users/login`;
      const found = await axios.post(url, user);

      if (found.data.email) {
        setUser(found.data);
        Navigate("/");
      } else {
        setMsg("Invalid User or Password");
      }
    } catch {
      setMsg("Login failed. Try again.");
    }
  };

  const goToRegister = () => {
    Navigate("/register");
  };

  return (
    <div className="form-container">
      <h3>Login</h3>
      {msg}
      <p>
        <input
          type="text"
          placeholder="Email address"
          value={user.email || ""}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
          value={user.pass || ""}
          onChange={(e) => setUser({ ...user, pass: e.target.value })}
        />
      </p>
      <button onClick={handleSubmit}>Submit</button>
      <p>
        <button onClick={goToRegister}>Create Account</button>
      </p>
    </div>
  );
}
