const express = require('express');
const controller = require('../controllers');
const router = express.Router();

router.get('/users', controller.other.users);
router.get('/flipbooks', controller.other.flipbooks);
router.get('/frames', controller.other.frames);

module.exports = router;