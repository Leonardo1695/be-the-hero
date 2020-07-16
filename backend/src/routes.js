const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.use('/ongs', require('./routes/ongs-routes'))
routes.use('/incidents', require('./routes/incidents-routes'))

routes.post('/sessions', SessionController.create)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index)



module.exports = routes