const model = require ('../models');

function getFlipbookByName (req, res, next) {
    return model.flipbook.getFlipbookByName(req.params.name)
        .then(flipbook => {
            res.status(200).json({ data: flipbook });
        })
        .catch(err => {
            console.log(err);
            next({ status: 500, message: 'Internal Server Error', error: err });
        });
}

function getFrameById (req, res, next) {
    return model.flipbook.getFrameById(req.params.name, req.params.frame_index)
        .then(frame => {
            res.status(200).json({ data: frame });
        })
        .catch(err => {
            console.log(err);
            next({ status: 500, message: 'Internal Server Error', error: err });
        })
}

function createNewFrame(req, res, next) {
    return model.flipbook.createNewFrame(req.params.name, req.body)
        .then(frame => {
            res.status(200).json({ data: frame[0] });
        })
        .catch(err => {
            console.log(err);
            next({ status: 500, message: 'Internal Server Error', error: err });
        });
}

function updateFrame(req, res, next) {
    return model.flipbook.createNewFrame(req.params.name, req.body, req.params.frame_index)
        .then(frame => {
            res.status(200).json({ data: frame[0] });
        })
        .catch(err => {
            console.log(err);
            next({ status: 500, message: 'Internal Server Error', error: err });
        });
}

function deleteFrameById(req, res, next) {
    return model.flipbook.deleteFrameById(req.params.name, req.params.frame_index)
        .then(frame => {
            res.status(200).json({ data: frame[0] });
        })
        .catch(err => {
            console.log(err);
            next({ status: 500, message: 'Internal Server Error', error: err });
        });
}

module.exports = {
    getFrameById,
    createNewFrame,
    updateFrame,
    deleteFrameById,
    getFlipbookByName
};