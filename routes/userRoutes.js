const express = require("express");

const authController = require("../controller/authController");
const userController = require("../controller/userController")

// USER ROUTER
const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/refresh-token",authController.refreshAccessToken)

//secured routes
router.use(authController.protect);
router.route("/logout").post(authController.logoutUser)
router.route("/current-user").get(userController.getCurrentUser)

router.use(authController.restrictTo('admin'));
router.route("/getAllUsers").get(authController.getAllUsers)

module.exports = router;
