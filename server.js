const mongoose = require("mongoose");
const dotenv = require("dotenv");
// ADD TO ENVIRONMENT VARIABLES
dotenv.config({ path: ".env" });

// UNCAUGHT_EXCEPTION
process.on("unhandledException", (err) => {
  console.log("uncaughtException! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

//GET CONNECTION STRING
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//CONNECT TO CLOUD DATABASE
mongoose
  .connect(DB)
  .then(() => console.log("connected successfully!!!"))
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

// START SERVER
const app = require("./app");
const port = process.env.PORT || 3500;
const server = app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});

// UNHANDLED_REJECTION
process.on("unhandledRejection", (err) => {
  server.close(() => {
    process.exit(1);
  });
});
