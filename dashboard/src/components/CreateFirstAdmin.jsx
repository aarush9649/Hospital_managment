import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CreateFirstAdmin = () => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", 
    nic: "", dob: "", gender: "", password: ""
  });

  const navigateTo = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/create-admin", // backend URL
        formData
      );

      toast.success("✅ First Admin Created Successfully!");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", nic: "", dob: "", gender: "", password: "" });

      setTimeout(() => navigateTo("/login"), 2000);

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create admin");
    }
  };

  return (
    <section className="container form-component">
      <img src="/logo.png" alt="logo" className="logo" />
      <h1 className="form-title">CREATE FIRST ADMIN ACCOUNT</h1>
      <p style={{ color: "#ff6b6b", textAlign: "center" }}>
        Initial setup only. Use this form to create your first admin.
      </p>
      <form onSubmit={handleCreateAdmin}>
        <div>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Mobile Number" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <input type="text" name="nic" placeholder="NIC" value={formData.nic} onChange={handleChange} required />
          <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required />
        </div>
        <div>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit" style={{ background: "#28a745" }}>CREATE ADMIN ACCOUNT</button>
        </div>
      </form>
    </section>
  );
};

export default CreateFirstAdmin;
