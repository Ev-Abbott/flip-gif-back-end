const express = require('express');
const controller = require('../controllers');
const router = express.Router();

router.get('/', controller.flipbook.getAllFlipbooksByQuery);
router.get('/:name', controller.flipbook.getFlipbookByName);

// Frame related info
router.get('/:name/frames/:frame_index', controller.flipbook.getFrameById);
router.post('/:name/frames', controller.flipbook.createNewFrame);
router.patch('/:name/frames/:frame_index', controller.flipbook.updateFrame);
router.delete('/:name/frames/:frame_index', controller.flipbook.deleteFrameById);



module.exports = router;