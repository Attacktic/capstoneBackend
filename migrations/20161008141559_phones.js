exports.up = function(knex, Promise) {
    return knex.schema.createTable('cameras', function (t) {
      t.increments('id');
      t.string('user_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cameras');
};
