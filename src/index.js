const Joi = require('@hapi/joi')

module.exports = Joi.object({
  title: Joi.string().max(256),
  type: Joi.any().allow('rich', 'image', 'video', 'gifv', 'article', 'link'),
  description: Joi.string().max(2048),
  url: Joi.string().uri(),
  timestamp: Joi.string().isoDate(),
  color: Joi.number().integer().min(0).max(16777215),
  footer: Joi.object({
    text: Joi.string().max(2048).required(),
    url: Joi.string().uri(),
    proxy_icon_url: Joi.string().uri()
  }),
  image: Joi.object({
    url: Joi.string().uri(),
    proxy_url: Joi.string().uri(),
    height: Joi.number().integer(),
    width: Joi.number().integer()
  }),
  thumbnail: Joi.object({
    url: Joi.string().uri(),
    proxy_url: Joi.string().uri(),
    height: Joi.number().integer(),
    width: Joi.number().integer()
  }),
  video: Joi.object({
    url: Joi.string().uri(),
    height: Joi.number().integer(),
    width: Joi.number().integer()
  }),
  provider: Joi.object({
    name: Joi.string(),
    url: Joi.string().uri()
  }),
  author: Joi.object({
    name: Joi.string().max(256),
    url: Joi.string().uri(),
    icon_url: Joi.string().uri(),
    proxy_icon_url: Joi.string().uri()
  }),
  fields: Joi.array().items(
    Joi.object({
      name: Joi.string().max(256).required(),
      value: Joi.string().max(1024).required(),
      inline: Joi.boolean()
    })
  ).max(25)
}).custom((embed, helpers) => {
  const sum = 
    (embed.title || '').length +
    (embed.description || '').length +
    (embed.fields || []).reduce((previous, current) => {
      return previous + current.name.length + current.value.length
    }, 0) +
    ((embed.footer || {}).text || '').length +
    ((embed.author || {}).name || '').length
  if (sum > 6000) {
    return helpers.message('the characters in all title, description, field.name, field.value, footer.text, and author.name fields must not exceed 6000 characters in total')
  } else {
    return embed
  }
}, 'max text length')

console.log(module.exports.validate({
  title: 'This one is invalid',
  fields: [
    {
      'title': 'Because this field uses "title" instead of "name", and is missing its value!'
    }
  ]
}))