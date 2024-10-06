export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const name = err.name;
  const message = err.message || "Something Went wrong";

  res.status(statusCode).json({
    StatusCode: statusCode,
    ErrorName: name,
    ErrorMessage: message,
  });
};
