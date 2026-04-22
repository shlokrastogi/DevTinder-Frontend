import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          email: emailId,
          password,
        },
        {
          withCredentials: true, // 🔥 REQUIRED
        },
      );
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend font-bold text-lg">Login</legend>

        <label className="label">Email</label>

        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label">Password</label>

        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
