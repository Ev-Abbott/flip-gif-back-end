const flipbooks = require('../flipbooks.json');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('flipbooks').del()
    .then(function () {
      // Inserts seed entries
      return knex('flipbooks').insert(flipbooks).then(() => {
        return knex.raw(
          `SELECT setval('flipbooks_id_seq', (SELECT MAX(id) FROM flipbooks));`
        );
      });
    });
};
