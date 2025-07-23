import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role:{
    type: String,
    default: "user",
    enum: ["user", "admin"]
  }
}); 
const Auth = mongoose.model("Auth", authSchema);

export default Auth;
