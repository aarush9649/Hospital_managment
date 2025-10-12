import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated, setAdmin } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/login`,
        { email, password, role: "Admin" },
        { withCredentials: true }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      setAdmin(data.user);
      navigateTo("/"); // redirect to dashboard
      setEmail("");
      setPassword("");

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed! Please check your credentials.");
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <section className="container form-component">
      <img src="/logo.png" alt="logo" className="logo" />
      <h1 className="form-title">WELCOME TO ZEECARE</h1>
      <p>Only Admins Are Allowed To Access These Resources!</p>

      <div style={{ 
        textAlign: "center", 
        marginBottom: "20px", 
        padding: "15px", 
        background: "#f8f9fa", 
        borderRadius: "8px",
        border: "1px solid #e9ecef"
      }}>
        <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
          Don't have an admin account?{" "}
          <span 
            style={{ 
              color: "#271776ca", 
              fontWeight: "bold", 
              cursor: "pointer"
            }}
            onClick={() => navigateTo("/setup-admin")}
          >
            Create First Admin
          </span>
        </p>
      </div>

      <form onSubmit={handleLogin}>
        <input
          type="text"
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
        <div style={{ justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </section>
  );
};

export default Login;
