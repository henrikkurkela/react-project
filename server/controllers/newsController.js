const newsRouter = require('express').Router()

const NewsModel = require('../models/newsModel')

const News = new NewsModel()

const auth = require('../middlewares/authMiddleware')

newsRouter.get('/', (request, response) => {

	News.getAll().then((result) => {
		response.json(result)
	}).catch((error) => {
		console.log(error)
		response.status(500).end()
	})
})

newsRouter.post('/', auth, (request, response) => {

	if (request.auth === null) {
		response.status(401).end()
	} else if (request.auth.type !== 'admin') {
		response.status(401).end()
	} else if (request.body.headline === "" || request.body.content === "" || !Number.isFinite(request.body.category)) {
		response.status(400).end()
	} else {
		News.addStory(request.body).then((result) => {
			response.json(result)
		}).catch((error) => {
			console.log(error)
			response.status(500).end()
		})
	}
})

newsRouter.delete('/:id', auth, (request, response) => {

	if (request.auth === null) {
		response.status(401).end()
	} else if (request.auth.type === 'admin') {
		News.deleteById(request.params.id).then(() => {
			response.status(204).end()
		}).catch((error) => {
			console.log(error)
			response.status(500).end()
		})
	} else {
		response.status(401).end()
	}
})

newsRouter.patch('/:id', auth, async (request, response) => {

	try {
		switch (request.body.action) {
			case 'like':
				await News.likeStory(request.params.id)
				break
			case 'unlike':
				await News.dislikeStory(request.params.id)
				break
			default:
				if (request.auth === null) {
					response.status(401).send('Unauthorized')
					return
				} else if (request.auth.type !== 'admin') {
					response.status(401).send('Unauthorized')
					return
				} else {
					await News.patchStory(request.body)
				}
		}

		const result = await News.getAll()
		response.json(result.find((item) => item.id === Number(request.params.id)))
	} catch (error) {
		console.log(error)
		response.status(500).end()
	}
})

module.exports = newsRouter
