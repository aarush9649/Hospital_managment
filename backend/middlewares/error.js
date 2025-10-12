class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  // Default values
  let customError = { ...err };
  customError.message = err.message || "Internal Server Error";
  customError.statusCode = err.statusCode || 500;

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    customError = new ErrorHandler(message, 400);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again!`;
    customError = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again!`;
    customError = new ErrorHandler(message, 400);
  }

  // CastError
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`;
    customError = new ErrorHandler(message, 400);
  }

  // Prepare error message
  const errorMessage = customError.errors
    ? Object.values(customError.errors)
        .map((error) => error.message)
        .join(" ")
    : customError.message;

  return res.status(customError.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
