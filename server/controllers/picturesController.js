const picturesRouter = require('express').Router()

const pictures = require('../models/picturesModel')

picturesRouter.get('/', async (request, response) => {

    try {
        response.json({ pictures: await pictures() })
    } catch (error) {
        console.log(error)
        response.status(500).end()
    }

})

module.exports = picturesRouter
