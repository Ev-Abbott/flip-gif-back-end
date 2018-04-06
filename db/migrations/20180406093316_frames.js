
exports.up = function(knex, Promise) {
    return knex.schema.createTable('frames', table => {
        table.increments();
        table.integer('flipbook_id').notNullable();
        table.foreign('flipbook_id').references('flipbooks.id');
        table.text('imgURL').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('frames');
};
