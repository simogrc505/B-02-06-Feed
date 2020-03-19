
exports.up = function (knex, Promise) {
  return knex.schema.createTable('categories', function (t) {
    t.charset('utf8')
    t.collate('utf8_general_ci')
    t.string('c_data').primary()
    t.string('domain')
  })
}

exports.down = function (knex, Promise) {
}
