import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // this is firbase user ID
  email: { type: String, required: true, unique: true },
  password: { type: String },
  displayName: { type: String, required: true },
  photoURL: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

export default User;
