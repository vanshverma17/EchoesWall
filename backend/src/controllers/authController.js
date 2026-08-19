const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/User");

const ping = (_req, res) => {
  res.json({ status: "ok" });
};

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email, and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name: name.trim(), email: normalizedEmail, passwordHash });

    res.status(201).json({ id: user._id.toString(), email: user.email, name: user.name });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, identifier, password } = req.body || {};
    const inputIdentifier = (identifier || email || "").trim();

    if (!inputIdentifier || !password) {
      return res.status(400).json({ message: "Email/ID and password are required" });
    }

    const normalized = inputIdentifier.toLowerCase();
    const queryConditions = [
      { email: normalized },
      { name: inputIdentifier }
    ];

    if (mongoose.Types.ObjectId.isValid(inputIdentifier)) {
      queryConditions.push({ _id: new mongoose.Types.ObjectId(inputIdentifier) });
    }

    const user = await User.findOne({ $or: queryConditions });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  ping,
  signup,
  login,
};

