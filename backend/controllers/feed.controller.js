const Post = require('../models/Post')
const User = require('../models/User');
const { rankPosts } = require('../utils/feed.algorithm');
const { alterPostForUser } = require('../utils/misinformationEngine')

exports.getFeed = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        let posts = await Post.find().populate("author", "username").sort({ createdAt: -1 })

        posts = rankPosts(posts, user);

        let altered = posts.map(p => alterPostForUser(p, user))
        if(req.query.access == 'musibat-ke-liye-tayar-ho-jao') altered = posts

        return res.json({
            success: true,
            count: altered.length,
            posts: altered
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