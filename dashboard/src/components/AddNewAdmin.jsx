import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const AddNewAdmin = () => {
  const { isAuthenticated } = useContext(Context);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", 
    nic: "", dob: "", gender: "", password: ""
  });
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/user/admin/addnew", formData);
      
      toast.success(data.message);
      navigateTo("/");
      
      setFormData({ firstName: "", lastName: "", email: "", phone: "", nic: "", dob: "", gender: "", password: "" });
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add admin");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container form-component add-admin-form">
        <img src="/logo.png" alt="logo" className="logo"/>
        <h1 className="form-title">ADD NEW ADMIN</h1>
        
        <form onSubmit={handleAddNewAdmin}>
          <div>
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required />
          </div>
          <div>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
            <input type="tel" name="phone" placeholder="Mobile Number" value={formData.phone} onChange={handleInputChange} required />
          </div>
          <div>
            <input type="text" name="nic" placeholder="NIC" value={formData.nic} onChange={handleInputChange} required />
            <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleInputChange} required />
          </div>
          <div>
            <select name="gender" value={formData.gender} onChange={handleInputChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "ADD NEW ADMIN"}
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewAdmin;