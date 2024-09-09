// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    profilePicture: {
      type: String,
      default: "default.jpg",
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot be more than 500 characters"],
    },
    location: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    socialLinks: {
      twitter: String,
      facebook: String,
      instagram: String,
      linkedin: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    interests: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
