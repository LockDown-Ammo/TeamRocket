const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    trustLevel: {
      type: Number,
      default: 0
    },

    misinformationSeed: {
      type: String,
      required: true
    },

    isBanned: {
      type: Boolean,
      default: false
    },

    banReason: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)