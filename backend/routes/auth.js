const express = require("express");
const { createUser, logIn } = require("../controllers/authController");

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(logIn);

module.exports = router;
