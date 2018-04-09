
exports.up = function(knex, Promise) {
    return knex.schema.createTable('flipbooks', table => {
        table.increments();
        table.string('name').notNullable();
        table.string('gifURL');
        table.integer('user_id').notNullable()
        table.foreign('user_id').references('users.id').onDelete('CASCADE');
      });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('flipbooks');
};
