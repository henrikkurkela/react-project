const avatarsRouter = require('express').Router()

const avatars = require('../models/avatarsModel')

avatarsRouter.get('/', (request, response) => {
    response.json(avatars)
})

module.exports = avatarsRouter
