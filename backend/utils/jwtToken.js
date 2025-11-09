import jwt from "jsonwebtoken";

export const generateToken = (user, message, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES || "5d",
    }
  );

  // ✅ Correct cookie name by role
  const cookieName =
    user.role === "Admin"
      ? "adminToken"
      : user.role === "Patient"
      ? "patientToken"
      : "token";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      httpOnly: true,
      sameSite:
        process.env.NODE_ENV === "production" ? "None" : "Lax", // ✅ fixes localhost
      secure: process.env.NODE_ENV === "production", // ✅ works on both localhost & HTTPS
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
