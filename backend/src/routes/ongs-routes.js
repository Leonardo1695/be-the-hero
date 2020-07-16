const express = require('express')
const OngsController = require('../controllers/OngsController')
const { celebrate, Segments, Joi } = require('celebrate')

const ongs = express.Router()

ongs.get('/', OngsController.index)

ongs.post('/', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngsController.create)

ongs.delete('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), OngsController.delete)

module.exports = ongs
