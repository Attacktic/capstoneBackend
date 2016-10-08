exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (t) {
      t.increments('id');
      t.string('key');
      t.string('name');
      t.string('email');
      t.string('pass');
      t.string('phone');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
