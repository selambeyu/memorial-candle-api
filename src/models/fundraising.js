const mongoose = require("mongoose");

const FundraisingCampaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goal_amount: { type: Number, required: true },
  current_amount: { type: Number, default: 0 },
  image_url: { type: String }, // URL to campaign image
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User
  memorial_id: { type: mongoose.Schema.Types.ObjectId, ref: "Memorial" }, // Reference to Memorial
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const FundraisingCampaign = mongoose.model(
  "FundraisingCampaign",
  FundraisingCampaignSchema
);
export default FundraisingCampaign;
