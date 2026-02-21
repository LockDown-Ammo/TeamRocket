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

exports.ratePost = async (req, res) => {
  try {
    const { value } = req.body
    const postId = req.params.id

    if(!value || value < 1 || value > 5) return res.status(400).json({
      success: false,
      error: {
        code: "INVALID_RATING",
        message: "Rating needs to be between 1 and 5"
      }
    })

    const post = await Post.findById(postId)
    if(!post) return res.status(404).json({
      success: false,
      error: {
        code: "POST_NOT_FOUND",
        message: "Post not found"
      }
    })

    const existingRating = post.ratings.find(r => r.user.toString() === req.user.id)
    if(existingRating) existingRating.value = value
    else post.ratings.push({ user: req.user.id, value: value })

    await post.save();

    return res.json({ success: true, message: "Post rated"})
  }
  catch (err) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: err.message
      }
    })
  }
}
