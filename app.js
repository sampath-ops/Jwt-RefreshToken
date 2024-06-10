const express = require("express");
const app = express();
const globalErrorHandler = require("./controller/errorHandler");
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require('express-rate-limit');
const cors = require("cors");
const ApiError = require("./utils/ApiError");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//Rate limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limiter);

//body parser
app.use(express.json({ limit: "10kb" }));

// cookie parser
app.use(cookieParser());

//urlEncoded data parser
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);

// Data sanitize against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against xss
app.use(xss());

app.use("/api/v1/users", userRouter);

// ERROR HANDLER FOR INVALId ROUTES
app.all("*", (req, res, next) => {
  next(new ApiError(404, `can't find ${req.originalUrl} on this server`));
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;
