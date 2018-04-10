const knex = require('./knex');
const fs = require('fs');

return knex('frames')
    .then(res => {
        fs.writeFileSync('./frames.json', JSON.stringify(res));
        return;
    })