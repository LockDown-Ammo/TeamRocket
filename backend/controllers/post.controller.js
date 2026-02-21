const User = require("../models/User");
const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const {
      pokemonName,
      imageURL,
      location,
      type,
      size,
      level,
      health,
      heldItem,
      description,
    } = req.body;

    if (
      pokemonName == null ||
      imageURL == null ||
      location == null ||
      type == null ||
      size == null ||
      level == null ||
      health == null
    )
      return res.status(400).json({
        success: false,
        error: {
          code: "MISSING_FIELDS",
          message: "Requires fields missing",
        },
      });

    const newPost = new Post({
      author: req.user.id,
      pokemonName,
      imageURL,
      location,
      type,
      size,
      level,
      heldItem,
      health,
      description,
    });

    await newPost.save();
    return res.status(201).json({
      success: true,
      message: "Post created",
      post: newPost,
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
