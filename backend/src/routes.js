const express = require('express')

const OngController = require('./controllers/OngsController')
const IncidentController = require('./controllers/IncidentsController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)

routes.get('/profile', ProfileController.index)

routes.post('/sessions', SessionController.create)

module.exports = routes