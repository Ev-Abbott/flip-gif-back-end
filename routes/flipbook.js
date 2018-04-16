const express = require('express');
const controller = require('../controllers');
const router = express.Router();
const jwt = require('jsonwebtoken');

function authorize (req, res, next) {
    const token = req.headers.token;
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return next({ status: 401, message: 'Unauthorized User' });
      }
  
      req.claim = payload;
  
      next();
    });
}

// Flipbook Related Info
router.get('/', controller.flipbook.getAllFlipbooksByQuery);
router.get('/:name', controller.flipbook.getFlipbookByName);
router.post('/', controller.flipbook.createNewFlipbook);
router.delete('/:name', controller.flipbook.deleteFlipbook);
router.post('/:name/createGif', authorize, controller.flipbook.createNewGifFromFlipbook)

// Frame related info
router.get('/:name/frames/:frame_index', authorize, controller.flipbook.getFrameById);
router.post('/:name/frames', authorize, controller.flipbook.createNewFrame);
router.patch('/:name/frames/:frame_index', authorize, controller.flipbook.updateFrame);
router.delete('/:name/frames/:frame_index', authorize, controller.flipbook.deleteFrameById);

module.exports = router;