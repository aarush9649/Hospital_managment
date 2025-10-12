import jwt from "jsonwebtoken";

export const generateToken = (user, message, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  const cookieName =
    user.role === "Admin" ? "adminToken" : user.role === "Patient" ? "patientToken" : "doctorToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json({
      success: true,
      message,
      user,
    });
};
