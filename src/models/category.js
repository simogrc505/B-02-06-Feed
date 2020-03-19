const { Model } = require('objection')

const config = require('config')
const knex = require('knex')(config.db)

Model.knex(knex)

class Category extends Model {
  static get tableName () {
    return 'categories'
  }

  static get idColumn () {
    return 'id'
  }

 /* static get relationMappings() {
    const User = require('./category');

    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'organizations.id',
          to: 'users.organization_id',
        }
      }
    }
  }*/
}

module.exports = Category
