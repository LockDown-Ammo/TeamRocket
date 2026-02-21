const express = require('express')
const router = express.Router()
const postController = require('../controllers/post.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/', authMiddleware, postController.createPost)
router.post('/:id/rate', authMiddleware, postController.ratePost)
router.post('/:id/report', authMiddleware, postController.reportPost)

module.exports = router