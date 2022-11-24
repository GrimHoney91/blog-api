const express = require('express');
const router = express.Router();
const commentRouter = require('./comment-router');
const postController = require('../controllers/post-controller');

/* GET all posts */
router.get('/', postController.get_posts);

/*  POST a single post  */
router.post('/', postController.post_post);



/*  GET a single post  */
router.get('/:postId', postController.get_post);

/*  PUT a single post  */
router.put('/:postId', postController.put_post);

/*  DELETE a single post  */
router.delete('/:postId', postController.delete_post);

router.use('/:postId/comments', commentRouter);

module.exports = router;