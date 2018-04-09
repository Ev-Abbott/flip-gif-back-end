const knex = require('../db/knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function getUserByUsername(username) {
    return knex('users')
        .select('*')
        .where('username', username)
        .first();
}

function signup(user) {
    let id;
    let oldPass;
    let token;
    return getUserByUsername(user.username)
        .then(existingUser => {
            if (existingUser) throw 'User already exists';
            return bcrypt.hash(user.password, 10);
        })
        .then(hashedPassword => {
            oldPass = user.password;
            user.password = hashedPassword;
            return knex('users')
                .insert(user)
                .returning('*');
         })
        .then(userReturned => {
            id = userReturned[0].id;
            return loginAtSignup(user.username, oldPass);
        })
        .then(tokenReturned => {
            token = tokenReturned;
            let newFlip = { name: `${user.username}_flipbook`, user_id: id};
            return knex('flipbooks')
                .insert(newFlip)
                .returning('*');
        })
        .then(flipbook => {
            return { flipbook: flipbook[0], token: token.token };
        });

}

function loginAtSignup (username, password) {
    let validUser;
    let claim;
    return getUserByUsername(username)
        .then(user => {
            if (!user) throw 'Please enter a valid username';
            validUser = user;
            return bcrypt.compare(password, user.password);
        }) 
        .then(passwordIsValid => {
            if (!passwordIsValid) throw 'Invalid password provided';
            claim = { user_id: validUser.id };
            const token = jwt.sign(claim, process.env.JWT_SECRET, { expiresIn: Date.now() + 2419200 });
            return { token };
         });
}

function login (username, password) {
    let validUser;
    let claim;
    let tokenToSend;
    return getUserByUsername(username)
        .then(user => {
            if (!user) throw 'Please enter a valid username';
            validUser = user;
            return bcrypt.compare(password, user.password);
        }) 
        .then(passwordIsValid => {
            if (!passwordIsValid) throw 'Invalid password provided';
            claim = { user_id: validUser.id };
            const token = jwt.sign(claim, process.env.JWT_SECRET, { expiresIn: Date.now() + 2419200 });
            tokenToSend = token;
            return knex('flipbooks')
                .where({ user_id: validUser.id })
                .returning('*')
                .first()
         })
        .then(flipbook => {
            return { token: tokenToSend, flipbook };
        });
}

module.exports = {
    signup, login
};