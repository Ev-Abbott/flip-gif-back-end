const knex = require('../db/knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function getUserByEmail(email) {
    return knex('users')
        .select('*')
        .where('email', email)
        .first();
}

function signup(user) {
    return getUserByEmail(user.email)
        .then(existingUser => {
            if (existingUser) throw 'User already exists';
            return bcrypt.hash(user.password, 10);
        })
        .then(hashedPassword => {
            user.password = hashedPassword;
            return knex('users')
                .insert(user)
                .returning('*');
         });

}

function login (email, password) {
    let validUser;
    let claim;
    return getUserByEmail(email)
        .then(user => {
            if (!user) throw 'Please enter a valid username';
            validUser = user;
            return bcrypt.compare(password, user.password);
        }) 
        .then(passwordIsValid => {
            if (!passwordIsValid) throw 'Invalid password provided';
            claim = { user_id: validUser.id };
            return knex('flipbooks')
                .where('user_id', validUser.id);
         });
}

module.exports = {
    signup, login
};