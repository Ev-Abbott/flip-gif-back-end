
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('flipbooks').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('flipbooks_id_seq', 1, FALSE);"
      );
    })
    .then(function () {
      // Inserts seed entries
      return knex('flipbooks').insert([
        {id: 1, name: 'myTestFlipbook'}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('flipbooks_id_seq', (SELECT MAX(id) FROM flipbooks));"
      );
    });
};

