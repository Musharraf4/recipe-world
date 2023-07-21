import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: { required: true, unique: true, type: String },
  password: { required: true, type: String },
});

export const UserModel = mongoose.model("users", UserSchema);
