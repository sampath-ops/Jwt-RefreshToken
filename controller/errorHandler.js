const ApiError = require("./../utils/ApiError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new ApiError(400, message);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value ${value}. please use another value`;
  return new ApiError(400,message);
};

const handleValidationErrorDB = (err) => {
  const message = Object.values(err.errors)
    .map((el) => el.message)
    .join(". ");
  return new ApiError(400,`invalid input data: ${message}`);
};

// handle error for invalid jwt signature
const handleJWTError = (err) =>
  new ApiError(401,"invalid token, please login again");

// handle JWT expired error
const handleJWTExpiredError = (err) =>
  new ApiError(401,"Your token has expired, please login again");

const sendErrorPro = (err, req, res) => {
    
  //A) API [check if error occur when we are using api in postman]
  if (req.originalUrl.startsWith("/api")) {
    //1) response for operational errors
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    //2)  response for programming errors
    // console.error("ERROR", err);
    return res.status(err.statusCode).json({
      status: "error",
      message: "Something went very wrong",
    });
  }

  // B)RENDERED WEBSITE [error to show in website]
  //1) response for operational errors
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong",
      msg: err.message,
    });
  }
  //2)  response for programming errors
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong",
    msg: "Please try again later!",
  });
};

const sendErrorDev = (err, req, res) => {
  //A) API [check if error occur when we are using api in postman]
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // B) RENDERED WEBSITE [error to show in website]
  //log the error
  console.log("ERROR", err);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong",
    msg: err.message,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err);
    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    if (error.name === "TokenExpiredError")
      error = handleJWTExpiredError(error);
    sendErrorPro(error, req, res);
  }
};
