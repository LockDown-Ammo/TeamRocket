const express = require('express')
const router = express.Router()
const feedController = require('../controllers/feed.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/', authMiddleware, feedController.getFeed)

module.exports = router