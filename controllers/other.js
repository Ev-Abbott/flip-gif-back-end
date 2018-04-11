const model = require ('../models');

function users (req, res, next) {
    return model.other.users()
        .then(users => {
            res.status(200).json({ data: users });
        })
        .catch(err => {
            next({ status: 500, message: 'Internal Server Error', error: err });
        })
        
}

function flipbooks (req, res, next) {
    return model.other.flipbooks()
        .then(flipbooks => {
            res.status(200).json({ data: flipbooks });
        })
        .catch(err => {
            next({ status: 500, message: 'Internal Server Error', error: err });
        })
}

function frames (req, res, next) {
    return model.other.frames()
        .then(frames => {
            res.status(200).json({ data: frames });
        })
        .catch(err => {
            next({ status: 500, message: 'Internal Server Error', error: err });
        })
}

module.exports = {
    users,
    flipbooks,
    frames
}