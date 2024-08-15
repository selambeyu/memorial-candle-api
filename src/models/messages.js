const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User or null
  guest_id: { type: mongoose.Schema.Types.ObjectId, ref: "Guest" }, // Reference to Guest or null
  memorial_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Memorial",
    required: true,
  }, // Reference to Memorial
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);
export default Message;
