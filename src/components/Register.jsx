import React, { useState } from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const { users, setUsers } = useContext(AppContext);
  const [user, setUser] = useState({});
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  // const handleSubmit = async () => {
  //   //setUsers([...users, user]);
  //   try {
  //     const url = `${API}/users/register`;
  //     await axios.post(url, user);
  //     Navigate("/login");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handleSubmit = async () => {
  try {
    const url = `${API}/users/register`;
    const res = await axios.post(url, user);
    console.log("Registered user:", res.data);

    setUsers([...users, res.data.user]);

    Navigate("/login");
  } catch (err) {
    console.log("Registration failed:", err.response?.data || err.message);
  }
};

  return (
    <div className="login-box" style={{ margin: "30px" }}>
      <div>
        <h3><i className="fas fa-user-plus"></i> Register</h3>
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
        <button onClick={handleSubmit}>Submit</button>
        <hr />
        {users &&
          users.map((value) => (
            <li>
              {value.name}-{value.email}-{value.pass}
            </li>
          ))}
      </div>
    </div>
  );
}