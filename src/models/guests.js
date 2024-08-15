const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  session_id: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
const Guest = mongoose.model("Guest", GuestSchema);
export default Guest;
