const { map, omit, tap } = require('ramda')
const { if_exists, if_already_exists } = require('../../utilities/errors_code')
const Author = require('../Author')

module.exports = {
  get: (id) => {
    return Author.query()
      .where({ id }).eager('organization').first()
  },

  create: (body) => {
    return Author.query().insert(body)
  }
}
