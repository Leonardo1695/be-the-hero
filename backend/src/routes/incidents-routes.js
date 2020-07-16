const express = require('express')
const IncidentsController = require('../controllers/IncidentsController')
const { celebrate, Segments, Joi } = require('celebrate')

const incidents = express.Router()

incidents.get('/', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentsController.index)

incidents.post('/', IncidentsController.create)

incidents.delete('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentsController.delete)

module.exports = incidents
