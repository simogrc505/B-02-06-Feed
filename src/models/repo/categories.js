const { map, omit, tap } = require('ramda')
const { if_exists, if_already_exists } = require('../../utilities/errors_code')
const Category = require('../Category')

module.exports = {
  get: (id) => {
    return Category.query()
      .where({ id }).eager('organization').first()
  },

  create: (body) => {
    return Category.query().insert(body).then(tap(console.log))
  }
}
