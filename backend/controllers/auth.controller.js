const User = require("../models/User");
const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function generateMisinformationSeed() {
  return crypto.randomBytes(16).toString("hex");
}

function generateAuthToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
}

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          code: "MISSING_FIELDS",
          message: "All fields are required",
        },
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email))
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_EMAIL",
          message: "Email is invalid",
        },
      });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({
        success: false,
        error: {
          code: "USER_ALREADY_EXISTS",
          message: "User already exists",
        },
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      misinformationSeed: generateMisinformationSeed(),
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: {
        code: "SERVER_ERROR",
        message: err.message,
      },
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          code: "MISSING_FIELDS",
          message: "Email and password required",
        },
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: "USER_NOT_FOUND",
          message: "User not found",
        },
      });
    }

    if (user.isBanned) {
      return res.status(403).json({
        success: false,
        error: {
          code: "USER_BANNED",
          message: user.banReason || "Account banned",
        },
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({
        success: false,
        error: {
          code: "INVALID_PASSWORD",
          message: "Invalid credentials",
        },
      });

    user.trustLevel += 1;
    await user.save();

    const userToken = generateAuthToken(user);

    res.json({
      success: true,
      message: "Login Successfull",
      token: userToken,
      trustLevel: user.trustLevel,
    });
  } catch (err) {
    res.status(500).json({
        success: false,
        error : {
            code: 'SERVER_ERROR',
            message: err.message
        }
    });
  }
};
