const model = require ('../models');

function login (req, res, next) {
    let { username, password } = req.body;
    return model.users.login(username, password)
        .then(tokenPkg => {
            return res.set('Auth', `Bearer: ${tokenPkg.token}`).send({ message: 'Login Successful', claim: tokenPkg.claim });
        })
        .catch(err => {
            return next({ status: 403, message: err });
        })
}

function signup (req, res, next) {
    return model.users.signup(req.body)
        .then(newUserPayload => {
            return res.set('Auth', `Bearer: ${newUserPayload.token}`).send({ message: 'Login Successful', flipbook: newUserPayload.flipbook });
        })
        .catch(err => {
            return next({ status: 401, message: err });
        })
}

module.exports = {
    login,
    signup
};