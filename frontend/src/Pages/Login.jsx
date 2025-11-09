import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `/api/v1/user/login`,
        { email, password, role: "Patient" },
        { withCredentials: true }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      setUser(data.user);
      setEmail("");
      setPassword("");
      navigateTo("/");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error?.response?.data?.message || "Login failed. Please try again.");
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="container form-component login-form">
      <h2>Sign In</h2>
      <p>Please Login To Continue</p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p>Not Registered?</p>
          <Link to="/register" style={{ textDecoration: "none", color: "#271776ca" }}>
            Register Now
          </Link>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
