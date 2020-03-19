
exports.up = function (knex, Promise) {
  return knex.schema.createTable('contents', function (t) {
    t.charset('utf8')
    t.collate('utf8_general_ci')
    t.increments('id').unsigned().primary()
    t.string('title')
    t.text('description', 500)
    t.string('link')
    t.string('external_id')
    t.string('author_id').index().references('id').inTable('authors')
    t.string('category_id').index().references('c_data').inTable('categories')
    t.dateTime('created_at',{ precision: 6 })
    t.dateTime('updated_at', { precision: 6 })
  })
}

exports.down = function (knex, Promise) {
}
