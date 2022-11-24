const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

/*    GET list of users           */
router.get('/', userController.get_users);

/*    POST a single user           */
router.post('/', userController.post_user);


/*    GET single user           */
router.get('/:userId', userController.get_user);

/*    DELETE single user           */
router.delete('/:userId', userController.delete_user);


module.exports = router;