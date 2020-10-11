const adsRouter = require('express').Router()

let ads = require('../models/adsModel')

adsRouter.get('/', (request, response) => {
	response.json(ads)
})

module.exports = adsRouter
