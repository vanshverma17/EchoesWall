const express = require("express");
const {
  getEchoes,
  updateEchoes,
  deleteEchoes,
} = require("../controllers/wallController");

const router = express.Router();

// Echoes Routes (Backward Compatibility)
router.get("/", getEchoes);
router.put("/", updateEchoes);
router.delete("/", deleteEchoes);

module.exports = router;
