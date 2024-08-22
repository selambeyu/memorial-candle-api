import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  memorial_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Memorial",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Create the Favorite model
const Favorite = mongoose.model("Favorite", FavoriteSchema);

export default Favorite;
