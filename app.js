const express = require("express");
const app = express();
const globalErrorHandler = require("./controller/errorHandler");
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//body parser
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;
