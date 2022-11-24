const express = require('express');
const router = express.Router({mergeParams: true});

const commentController = require('../controllers/comment-controller');


/* comment resource */
router.get('/', commentController.get_comments);

router.post('/', commentController.post_comment);



router.get('/:commentId', commentController.get_comment);

router.delete('/:commentId', commentController.delete_comment);


module.exports = router;