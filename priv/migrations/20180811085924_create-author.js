
exports.up = function (knex, Promise) {
  return knex.schema.createTable('authors', function (t) {
    t.charset('utf8')
    t.collate('utf8_general_ci')
    t.string('id').primary()
  })
}

exports.down = function (knex, Promise) {
}
