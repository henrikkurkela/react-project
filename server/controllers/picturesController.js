const picturesRouter = require('express').Router()

const pictures = require('../models/picturesModel')

picturesRouter.get('/', (request, response) => {
    response.json(pictures)
})

module.exports = picturesRouter
