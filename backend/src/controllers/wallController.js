const WallSnapshot = require("../models/WallSnapshot");
const { sanitizeItems, attachItemIds } = require("../utils/itemHelpers");

// --- Wall Routes ---

const getWalls = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const walls = await WallSnapshot.find({ ownerId: userId }).sort({ updatedAt: -1 });
    res.json(walls.map(attachItemIds));
  } catch (err) {
    next(err);
  }
};

const getLatestWall = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const latest = await WallSnapshot.findOne({ ownerId: userId }).sort({ updatedAt: -1 });
    if (!latest) {
      return res.json({ items: [] });
    }
    res.json(attachItemIds(latest));
  } catch (err) {
    next(err);
  }
};

const getWallById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const wall = await WallSnapshot.findOne({ _id: id, ownerId: userId });
    if (!wall) {
      return res.status(404).json({ message: "Wall not found" });
    }
    res.json(attachItemIds(wall));
  } catch (err) {
    next(err);
  }
};

const createWall = async (req, res, next) => {
  try {
    const { items, userId, userEmail, userName, title } = req.body || {};
    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "items array is required" });
    }
    if (!userId || !userEmail || !userName) {
      return res.status(400).json({ message: "userId, userEmail, and userName are required" });
    }

    const sanitized = sanitizeItems(items);

    const wall = await WallSnapshot.create({
      items: sanitized,
      ownerId: userId,
      ownerEmail: userEmail.trim().toLowerCase(),
      ownerName: userName.trim(),
      title: title?.trim?.() || "",
    });
    res.status(201).json(attachItemIds(wall));
  } catch (err) {
    next(err);
  }
};

const updateWall = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { items, userId, userEmail, userName, title } = req.body || {};
    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "items array is required" });
    }
    if (!userId || !userEmail || !userName) {
      return res.status(400).json({ message: "userId, userEmail, and userName are required" });
    }

    const sanitized = sanitizeItems(items);
    const wall = await WallSnapshot.findOneAndUpdate(
      { _id: id, ownerId: userId },
      {
        items: sanitized,
        ownerEmail: userEmail.trim().toLowerCase(),
        ownerName: userName.trim(),
        title: title?.trim?.() || "",
      },
      { new: true, runValidators: true }
    );

    if (!wall) {
      return res.status(404).json({ message: "Wall not found" });
    }

    res.json(attachItemIds(wall));
  } catch (err) {
    next(err);
  }
};

const deleteWalls = async (_req, res, next) => {
  try {
    await WallSnapshot.deleteMany({});
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const deleteWallById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const removed = await WallSnapshot.findOneAndDelete({ _id: id, ownerId: userId });
    if (!removed) {
      return res.status(404).json({ message: "Wall not found" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// --- Echoes Routes (Backward Compatibility) ---

const getEchoes = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const latest = await WallSnapshot.findOne({ ownerId: userId }).sort({ updatedAt: -1 });
    if (!latest) {
      return res.json([]);
    }
    const snapshot = attachItemIds(latest);
    res.json(snapshot.items || []);
  } catch (err) {
    next(err);
  }
};

const updateEchoes = async (req, res, next) => {
  try {
    const { items, userId, userEmail, userName, title } = req.body || {};
    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "items array is required" });
    }
    if (!userId || !userEmail || !userName) {
      return res.status(400).json({ message: "userId, userEmail, and userName are required" });
    }

    const sanitized = sanitizeItems(items);
    const wall = await WallSnapshot.create({
      items: sanitized,
      ownerId: userId,
      ownerEmail: userEmail.trim().toLowerCase(),
      ownerName: userName.trim(),
      title: title?.trim?.() || "",
    });
    const snapshot = attachItemIds(wall);
    res.json(snapshot.items || []);
  } catch (err) {
    next(err);
  }
};

const deleteEchoes = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    await WallSnapshot.deleteMany({ ownerId: userId });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getWalls,
  getLatestWall,
  getWallById,
  createWall,
  updateWall,
  deleteWalls,
  deleteWallById,
  getEchoes,
  updateEchoes,
  deleteEchoes,
};
