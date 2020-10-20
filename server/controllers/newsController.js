const newsRouter = require('express').Router()

let NewsModel = require('../models/newsModel')

let News = new NewsModel()

newsRouter.get('/', (request, response) => {

	News.getAll().then((result) => {
		response.json(result)
	}).catch((error) => {
		console.log(error)
		response.status(500).end()
	})
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
