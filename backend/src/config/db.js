const mongoose = require("mongoose");

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("MONGODB_URI env var is required to start the API");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
    serverSelectionTimeoutMS: 8000,
  });
  console.log("Connected to MongoDB");
};

module.exports = connectDB;
