const { Model } = require('objection')

const config = require('config')
const knex = require('knex')(config.db)

Model.knex(knex)

class Author extends Model {
  static get tableName () {
    return 'authors'
  }

  static get idColumn () {
    return 'id'
  }

/*  static get relationMappings() {
    const Content = require('./content');

    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: content,
        join: {
          from: 'authors.id',
          to: 'contents.author_id',
        }
      }
    }
  }*/
}

module.exports = Author
