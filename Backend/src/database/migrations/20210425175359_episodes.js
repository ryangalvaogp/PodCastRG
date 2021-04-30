
exports.up= function(knex) {
  return knex.schema.createTable('episodes', function (table){
      table.string('id').primary();
      table.string('title').notNullable();
      table.string('members').notNullable();
      table.string('published_at').notNullable();
      table.string('thumbnail').notNullable();
      table.string('description').notNullable();
      table.integer('idUsuario').notNullable();
      table.foreign('idUsuario').references('id').inTable('user')
  })
}

exports.down= function(knex) {
    return knex.schema.dropTable('episodes');
}
