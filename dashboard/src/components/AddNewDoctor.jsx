import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const AddNewDoctor = () => {
  const { isAuthenticated } = useContext(Context);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
    doctorDepartment: ""
  });
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    
    // ✅ VALIDATION
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        !formData.nic || !formData.dob || !formData.gender || !formData.password || !formData.doctorDepartment) {
      toast.error("Please fill all fields!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);

    try {
      // ✅ SIMPLE JSON DATA
      const doctorData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone.toString(), // Convert to string
        nic: formData.nic.toString(), // Convert to string
        dob: formData.dob,
        gender: formData.gender,
        password: formData.password,
        doctorDepartment: formData.doctorDepartment
      };

      console.log("📤 Sending doctor data:", doctorData);

      const response = await axios.post(
        "http://localhost:5000/api/v1/user/doctor/addnew", 
        doctorData, 
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      navigateTo("/doctors");
      
      // ✅ CLEAR FORM
      setFormData({
        firstName: "", lastName: "", email: "", phone: "", 
        nic: "", dob: "", gender: "", password: "", doctorDepartment: ""
      });
      
    } catch (error) {
      console.error("❌ Frontend Error:", error);
      const errorMessage = error.response?.data?.message || "Failed to add doctor";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container add-doctor-form">
        <img src="/logo.png" alt="logo" className="logo"/>
        <h1 className="form-title">REGISTER A NEW DOCTOR</h1>

        <form onSubmit={handleAddNewDoctor}>
          <div className="first-wrapper">
            <div>
              <img
                src="/docHolder.jpg"
                alt="Doctor Avatar"
                style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "10px" }}
              />
              <p style={{ textAlign: "center", color: "#666", fontSize: "12px", marginTop: "10px" }}>
                Default Avatar
              </p>
            </div>
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Mobile Number *"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="nic"
                placeholder="NIC *"
                value={formData.nic}
                onChange={handleInputChange}
                required
              />
              <input
                type="date"
                name="dob"
                placeholder="Date of Birth *"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender *</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="password"
                name="password"
                placeholder="Password * (min 6 characters)"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <select
                name="doctorDepartment"
                value={formData.doctorDepartment}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Department *</option>
                {departmentsArray.map((depart, index) => (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                ))}
              </select>
              <button 
                type="submit" 
                disabled={loading}
                style={{ 
                  background: loading ? "#ccc" : "#271776ca",
                  cursor: loading ? "not-allowed" : "pointer",
                  padding: "12px",
                  fontSize: "16px"
                }}
              >
                {loading ? "Registering Doctor..." : "Register New Doctor"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewDoctor;