const express = require("express");
const { checkHealth, rootHealth } = require("../controllers/healthController");

const router = express.Router();

router.get("/api/health", checkHealth);
router.get("/", rootHealth);

module.exports = router;
