const express = require('express');
const controller = require('../controllers');
const router = express.Router();


router.get('/:name', controller.flipbook.getFlipbookByName);

// Frame related info
router.get('/:name/frames/:frame_id', controller.flipbook.getFrameById);
router.post('/:name/frames', controller.flipbook.createNewFrame);
router.patch('/:name/frames/:frame_id', controller.flipbook.updateFrame);
router.delete('/:name/frames/:frame_id', controller.flipbook.deleteFrameById);

module.exports = router;