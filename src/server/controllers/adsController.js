let ads = require('../models/adsModel')

const adsRouter = require('express').Router()

adsRouter.get('/', (request, response) => {
	response.json(ads)
})

module.exports = adsRouter
