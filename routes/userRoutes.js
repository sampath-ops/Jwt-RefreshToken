const express = require("express");

const authController = require("./../controller/authController");

// USER ROUTER
const router = express.Router();

router.post("/signUp", authController.signUp);
router.post("/login", authController.login);
router.post("/refresh-token",authController.refreshAccessToken)

//secured routes
router.route("/logout").post(authController.protect,  authController.logoutUser)

module.exports = router;
