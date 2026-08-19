const mongoose = require("mongoose");

const echoItemSchema = new mongoose.Schema(
  {
    id: { type: String, default: undefined },
    type: { type: String, enum: ["note", "image", "thought"], required: true },
    text: { type: String, default: "", trim: true },
    src: { type: String, default: "", trim: true },
    color: { type: String, default: "", trim: true },
    top: { type: String, default: "40px", trim: true },
    left: { type: String, default: "40px", trim: true },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const wallSnapshotSchema = new mongoose.Schema(
  {
    items: { type: [echoItemSchema], default: [] },
    ownerId: { type: String, required: true, index: true },
    ownerEmail: { type: String, required: true, lowercase: true, trim: true },
    ownerName: { type: String, required: true, trim: true },
    title: { type: String, default: "", trim: true },
  },
  {
    collection: "wallSnapshots",
    timestamps: true,
    versionKey: false,
  }
);

const WallSnapshot = mongoose.model("WallSnapshot", wallSnapshotSchema);

module.exports = WallSnapshot;
