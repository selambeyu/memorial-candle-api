const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
  memorial_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Memorial",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  guest_id: { type: mongoose.Schema.Types.ObjectId, ref: "Guest" },
  donated_by: { type: String },
  personal_word: { type: String },
  amount: {
    type: Number,
    required: true,
  },
  stripeSessionId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updated_at: { type: Date, default: Date.now },
});

const Donation = mongoose.model("Donation", DonationSchema);
export default Donation;
