const knex = require('../db/knex');

function users () {
    return knex('users');
}

function flipbooks() {
    return knex('flipbooks');
}

function frames() {
    return knex('frames');
}

module.exports = {
    users,
    flipbooks,
    frames
}