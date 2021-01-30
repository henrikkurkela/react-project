const adsRouter = require('express').Router()

const AdsModel = require('../models/adsModel')

const Ads = new AdsModel()

const auth = require('../middlewares/authMiddleware')

adsRouter.get('/', (request, response) => {

	Ads.getAll().then((result) => {
		response.json(result)
	}).catch((error) => {
		console.log(error)
		response.status(500).send('Internal server error.')
	})
})

adsRouter.post('/', auth, (request, response) => {

	if (request.auth === null) {
		response.status(401).send('Unauthorized.')
	} else if (request.auth.type !== 'admin') {
		response.status(401).send('Unauthorized.')
	} else {
		Ads.addAd(request.body).then((result) => {
			response.status(201).json(result)
		}).catch((error) => {
			console.log(error)
			response.status(500).send('Internal server error.')
		})
	}
})

adsRouter.delete('/:id', auth, (request, response) => {

	if (request.auth === null) {
		response.status(401).send('Unauthorized.')
	} else if (request.auth.type !== 'admin') {
		response.status(401).send('Unauthorized.')
	} else {
		Ads.deleteById(request.params.id)
		response.status(204).send('Unauthorized.')
	}
})

module.exports = adsRouter
