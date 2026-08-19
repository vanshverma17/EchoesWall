const express = require("express");
const {
  getWalls,
  getLatestWall,
  getWallById,
  createWall,
  updateWall,
  deleteWalls,
  deleteWallById,
} = require("../controllers/wallController");

const router = express.Router();

// Walls routes
router.get("/", getWalls);
router.post("/", createWall);
router.delete("/", deleteWalls);

router.get("/latest", getLatestWall);

router.get("/:id", getWallById);
router.put("/:id", updateWall);
router.delete("/:id", deleteWallById);

module.exports = router;
