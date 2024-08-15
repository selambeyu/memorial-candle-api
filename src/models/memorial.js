import mongoose from "mongoose";

// Define the Memorial schema
const MemorialSchema = new mongoose.Schema({
  person_name: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String }, // URL to the memorial image

  birth_date: { type: Date, required: true },
  deceased_date: { type: Date, required: true },
  user_image_url: { type: String }, // URL to the user's image
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User
  guest_id: { type: mongoose.Schema.Types.ObjectId, ref: "Guest" }, // Reference to Guest
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Create the Memorial model
const Memorial = mongoose.model("Memorial", MemorialSchema);

export default Memorial;
