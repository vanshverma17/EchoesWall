const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const wallRoutes = require("./routes/wallRoutes");
const echoRoutes = require("./routes/echoRoutes");
const healthRoutes = require("./routes/healthRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(",").map((origin) => origin.trim())
  : undefined;

// Middleware
app.use(
  cors({
    origin: CLIENT_ORIGIN && CLIENT_ORIGIN.length ? CLIENT_ORIGIN : "*",
  })
);
app.use(express.json({ limit: "25mb" }));

// Routes
app.use("/", healthRoutes); // Handles / and /api/health
app.use("/api/auth", authRoutes);
app.use("/api/walls", wallRoutes);
app.use("/api/echoes", echoRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Connect to Database and start server
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
