import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;
  
  if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  const user = await User.create({
    firstName, lastName, email, phone, nic, dob, gender, password, role: "Patient",
  });
  generateToken(user, "User Registered!", 200, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }
  
  if (role !== user.role) {
    return next(new ErrorHandler(`User Not Found With This Role!`, 400));
  }
  
  generateToken(user, "Login Successfully!", 201, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;
  
  if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
  }

  const admin = await User.create({
    firstName, lastName, email, phone, nic, dob, gender, password, role: "Admin",
  });
  
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, nic, dob, gender, password, doctorDepartment } = req.body;

    // ✅ SIMPLE VALIDATION
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !doctorDepartment) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    // ✅ CHECK EXISTING USER
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    // ✅ CREATE DOCTOR
    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role: "Doctor",
      doctorDepartment,
      docAvatar: {
        public_id: "default_avatar",
        url: "/docHolder.jpg"
      }
    });

    res.status(200).json({
      success: true,
      message: "Doctor registered successfully!",
      doctor,
    });
    
  } catch (error) {
    console.error("Doctor creation error:", error);
    return next(new ErrorHandler("Server error", 500));
  }
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res.status(200).cookie("adminToken", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  }).json({
    success: true,
    message: "Admin Logged Out Successfully.",
  });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res.status(200).cookie("patientToken", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  }).json({
    success: true,
    message: "Patient Logged Out Successfully.",
  });
});