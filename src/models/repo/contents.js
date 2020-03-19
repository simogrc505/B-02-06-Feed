const { map, omit, tap } = require('ramda')
const { if_exists, if_already_exists } = require('../../utilities/errors_code')
const Content = require('../Content')

module.exports = {
  get: (id) => {
    return Content.query()
      .where({ id }).eager('organization').first()
  },

  create: (body) => {
    return Content.query().insert(body)
  }
}
