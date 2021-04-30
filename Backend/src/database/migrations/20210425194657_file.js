
exports.up= function(knex) {
    return knex.schema.createTable('file', function (table) {
        table.increments('idFile').primary();
        table.string('url').notNullable();
        table.string('type').notNullable();
        table.integer('duration').notNullable();
        table.string('idEpisode');
        table.foreign('idEpisode').references('episodes.id')
        .onDelete("cascade")
        .onUpdate('cascade')

    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('file');
}
