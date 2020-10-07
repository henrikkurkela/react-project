let news = require('../models/newsModel')

const newsRouter = require('express').Router()

newsRouter.get('/', (request, response) => {
	response.json(news)
})

newsRouter.patch('/:id', (request, response) => {
	let index = news.findIndex(item => item.id === Number(request.params.id))
	news[index].likes = request.body.likes
	response.json(news[index])
})

module.exports = newsRouter
