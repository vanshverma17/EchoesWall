const express = require("express");
const { ping, signup, login } = require("../controllers/authController");

const router = express.Router();

router.get("/ping", ping);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
