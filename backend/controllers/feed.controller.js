const Post = require('../models/Post')

exports.getFeed = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "username").sort({ createdAt: -1 })

        return res.json({
            success: true,
            count: posts.length,
            posts: posts
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            error : {
                code: 'SERVER_ERROR',
                message: err.message
            }
        })
    }
}