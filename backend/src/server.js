const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(",").map((origin) => origin.trim())
  : undefined;

if (!MONGODB_URI) {
  console.error("MONGODB_URI env var is required to start the API");
  process.exit(1);
}

app.use(
  cors({
    origin: CLIENT_ORIGIN && CLIENT_ORIGIN.length ? CLIENT_ORIGIN : "*",
  })
);
app.use(express.json({ limit: "10mb" }));

mongoose.set("strictQuery", true);

const echoSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["note", "image", "thought"], required: true },
    text: { type: String, default: "", trim: true },
    src: { type: String, default: "", trim: true },
    color: { type: String, default: "", trim: true },
    top: { type: String, default: "40px", trim: true },
    left: { type: String, default: "40px", trim: true },
  },
  {
    collection: "echoes",
    timestamps: true,
    versionKey: false,
  }
);

const Echo = mongoose.model("Echo", echoSchema);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  {
    collection: "users",
    timestamps: true,
    versionKey: false,
  }
);

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

const connectDB = async () => {
  await mongoose.connect(MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
    serverSelectionTimeoutMS: 8000,
  });
  console.log("Connected to MongoDB");
};

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/auth/ping", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/auth/signup", async (req, res, next) => {
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

    res.status(201).json({ id: user._id, email: user.email, name: user.name });
  } catch (err) {
    next(err);
  }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", id: user._id, email: user.email, name: user.name });
  } catch (err) {
    next(err);
  }
});

app.get("/api/echoes", async (_req, res, next) => {
  try {
    const echoes = await Echo.find({}).sort({ updatedAt: -1 });
    res.json(echoes);
  } catch (err) {
    next(err);
  }
});

app.post("/api/echoes", async (req, res, next) => {
  try {
    const payload = req.body || {};
    if (!payload.type) {
      return res.status(400).json({ message: "type is required" });
    }
    const echo = await Echo.create(payload);
    res.status(201).json(echo);
  } catch (err) {
    next(err);
  }
});

app.put("/api/echoes", async (req, res, next) => {
  try {
    const { items } = req.body || {};
    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "items array is required" });
    }

    await Echo.deleteMany({});

    if (!items.length) {
      return res.json([]);
    }

    const sanitized = items.map((item) => ({
      type: item.type,
      text: item.text || "",
      src: item.src || "",
      color: item.color || "",
      top: item.top || "40px",
      left: item.left || "40px",
    }));

    const inserted = await Echo.insertMany(sanitized);
    res.json(inserted);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/echoes", async (_req, res, next) => {
  try {
    await Echo.deleteMany({});
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

app.delete("/api/echoes/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Echo.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Echo not found" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API ready on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1);
  });
