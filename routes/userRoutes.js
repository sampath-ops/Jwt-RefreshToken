const express = require("express");

const authController = require("./../controller/authController");

// USER ROUTER
const router = express.Router();

// signUp route
router.post("/signUp", authController.signUp);

module.exports = router;
