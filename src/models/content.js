const { Model } = require('objection')

const config = require('config')
const knex = require('knex')(config.db)

Model.knex(knex)

class Content extends Model {
  static get tableName () {
    return 'contents'
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
          from: 'contents.id',
          to: 'users.organization_id',
        }
      }
    }
  }*/
}

module.exports = Content
