import bcrypt from "bcrypt";
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
  },
  accessToken: {
    type: String,
    default: null,
  },
  refreshToken: {
    type: String,
    default: null,
  },
}); 

authSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

const Auth = mongoose.model("Auth", authSchema);



export default Auth;
