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

	if (request.auth !== null) {
		if (request.auth.type === 'admin') {
			if (request.body.headline === "" || request.body.content === "") {
				response.status(400).end()
			} else {
				News.addStory(request.body).then((result) => {
					response.json(result)
				})
			}
		} else {
			response.status(401).end()
		}
	} else {
		response.status(401).end()
	}

})

newsRouter.delete('/:id', auth, (request, response) => {

	if (request.auth !== null) {
		if (request.auth.type === 'admin') {
			News.deleteById(request.params.id)
			response.status(200).end()
		} else {
			response.status(401).send()
		}
	} else {
		response.status(401).end()
	}
})

newsRouter.patch('/:id', async (request, response) => {

	switch (request.body.action) {
		case 'like':
			await News.likeStory(request.params.id)
			break
		case 'unlike':
			await News.dislikeStory(request.params.id)
			break
		default:
	}

	News.getAll().then((result) => {
		response.json(result.find((item) => item.id === Number(request.params.id)))
	}).catch((error) => {
		console.log(error)
		response.status(500).end()
	})

})

module.exports = newsRouter
