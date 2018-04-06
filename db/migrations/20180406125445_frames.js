
exports.up = function(knex, Promise) {
    return knex.schema.createTable('frames', table => {
        table.increments();
        table.integer('index').notNullable();
        table.text('imgURL').notNullable();
        table.integer('flipbook_id').notNullable();
        table.foreign('flipbook_id').references('flipbooks.id').onDelete('CASCADE');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('frames');
};
