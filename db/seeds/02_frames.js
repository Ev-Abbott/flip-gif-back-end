
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('frames').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('frames_id_seq', 1, FALSE);"
      );
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('frames_id_seq', (SELECT MAX(id) FROM frames));"
      );
    });
};