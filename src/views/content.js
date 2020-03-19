const { pick, map, compose } = require('ramda')

const fields = ['id', 'external_id', 'updated_at', 'created_at', 'author', 'category', 'title', 'description', 'link']

module.exports = {
  one: pick(fields),
  many: map(compose(pick(fields))),
}
