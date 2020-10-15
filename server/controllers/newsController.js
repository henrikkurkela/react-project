const newsRouter = require('express').Router()

let news = require('../models/newsModel')

newsRouter.get('/', (request, response) => {
	response.json(news)
})

newsRouter.patch('/:id', (request, response) => {
	let index = news.findIndex(item => item.id === Number(request.params.id))

	switch (request.body.action) {
		case 'like':
			news[index].likes = news[index].likes + 1
			break
		case 'unlike':
			news[index].likes = news[index].likes - 1
			break
		default:
	}
	
	response.json(news[index])
})

module.exports = newsRouter
