const frames = require('../newFrames.json');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('frames').del()
    .then(function () {
      // Inserts seed entries
      return knex('frames').insert(frames).then(() => {
        return knex.raw(
          `SELECT setval('frames_id_seq', (SELECT MAX(id) FROM frames));`
        );
      });
    });
};
