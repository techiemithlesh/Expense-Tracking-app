const express = require("express");
const { createUser, loginUser } = require("../controller/UserController");
const router = express.Router();

router.post("/register-user", createUser);
router.post("/login", loginUser);

module.exports = router;
