const express = require('express')

const router = express.Router();

const upload = require ('../middlewares/upload');

const {validatePost} = require('../utils/validators/post');

const postController = require('../controllers/PostController');

router.get('/posts', postController.findPosts);

router.post('/posts', upload.single('image'), validatePost, postController.createPosts);

router.get('/posts/:id', postController.findPostById);

router.put('/posts/:id', upload.single('image'), validatePost, postController.updatePost);

router.delete('/posts/:id', postController.deletePost);

module.exports = router
