const Joi = require('@hapi/joi')
const validator = require('express-joi-validation').createValidator({
  passError: true,
})

exports.validate_contents_input = validator.query({
  limit: Joi.number().integer().min(1).max(1000),
  page: Joi.number().integer().min(0).max(25),
  order: Joi.string().valid('ASC', 'DESC'),
  orderBy: Joi.string().min(1),
})

exports.validate_create_content_input = validator.body(Joi.object({
  rss_link: Joi.string(),
}))
