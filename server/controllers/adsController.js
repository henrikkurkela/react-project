const adsRouter = require('express').Router()

const AdsModel = require('../models/adsModel')

const Ads = new AdsModel

adsRouter.get('/', (request, response) => {

	Ads.getAll().then((result) => {
		response.json(result)
	}).catch((error) => {
		console.log(error)
		response.status(500).end()
	})
})

module.exports = adsRouter
