const adsRouter = require('express').Router()

const AdsModel = require('../models/adsModel')

const Ads = new AdsModel()

const auth = require('../middlewares/authMiddleware')

adsRouter.get('/', (request, response) => {

	Ads.getAll().then((result) => {
		response.json(result)
	}).catch((error) => {
		console.log(error)
		response.status(500).end()
	})
})

adsRouter.post('/', auth, (request, response) => {

	if (request.auth === null) {
		response.status(401).end()
	} else if (request.auth.type !== 'admin') {
		response.status(401).end()
	} else {
		Ads.addAd(request.body).then((result) => {
			response.status(201).json(result)
		}).catch((error) => {
			console.log(error)
			response.status(500).end()
		})
	}
})

adsRouter.delete('/:id', auth, (request, response) => {

	if (request.auth === null) {
		response.status(401).end()
	} else if (request.auth.type !== 'admin') {
		response.status(401).end()
	} else {
		Ads.deleteById(request.params.id)
		response.status(204).end()
	}
})

module.exports = adsRouter
