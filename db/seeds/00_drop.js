
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('frames').del()
    .then(() => {
      return knex('flipbooks').del();
    });
};
