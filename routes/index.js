const express = require('express')

const router = express.Router();

const postController = require('../controllers/PostController');

module.exports = router

router.get('/posts', postController.findPosts);