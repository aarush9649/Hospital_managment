import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

export const Context = createContext({ isAuthenticated: false });

axios.defaults.withCredentials = true;

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/user/admin/me");
        setIsAuthenticated(true);
        setAdmin(data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        fontSize: "18px",
        color: "#271776ca"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, admin, setAdmin }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);