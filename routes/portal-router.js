const express = require('express');
const router = express.Router();

const portalController = require('../controllers/portal-controller');

router.post('/log-in', portalController.log_in);

router.get('/log-out', portalController.log_out);





module.exports = router;