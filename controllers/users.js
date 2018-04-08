const model = require ('../models');

function login (req, res, next) {
    let { email, password } = req.body;
    return model.users.login(email, password)
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
            return res.status(200).json({ data: newUserPayload[0] })
        })
        .catch(err => {
            return next({ status: 401, message: err });
        })
}

module.exports = {
    login,
    signup
};