import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import { Context } from "./main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import AddNewAdmin from "./components/AddNewAdmin";
import CreateFirstAdmin from "./components/CreateFirstAdmin";
import "./App.css";

const App = () => {
  const { isAuthenticated } = useContext(Context);

  return (
    <Router>
      {isAuthenticated && <Sidebar />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/setup-admin" element={!isAuthenticated ? <CreateFirstAdmin /> : <Navigate to="/" />} />
        <Route path="/doctor/addnew" element={isAuthenticated ? <AddNewDoctor /> : <Navigate to="/login" />} />
        <Route path="/admin/addnew" element={isAuthenticated ? <AddNewAdmin /> : <Navigate to="/login" />} />
        <Route path="/messages" element={isAuthenticated ? <Messages /> : <Navigate to="/login" />} />
        <Route path="/doctors" element={isAuthenticated ? <Doctors /> : <Navigate to="/login" />} />
      </Routes>
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </Router>
  );
};

export default App;