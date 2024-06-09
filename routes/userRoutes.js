const express = require("express");

const authController = require("../controller/authController");
const userController = require("../controller/userController")

// USER ROUTER
const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/refresh-token",authController.refreshAccessToken)

//secured routes
router.route("/logout").post(authController.protect, authController.logoutUser)
router.route("/current-user").get(authController.protect, userController.getCurrentUser)

module.exports = router;
