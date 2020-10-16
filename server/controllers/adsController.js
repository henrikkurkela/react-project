const adsRouter = require('express').Router()

let ads = require('../models/adsModel')

adsRouter.get('/', (request, response) => {

	ads().then((result) => {
		response.json(result)
	}).catch((error) => {
		console.log(error)
		response.status(500).end()
	})
})

module.exports = adsRouter
