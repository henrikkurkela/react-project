let users = require('../models/usersModel')

const auth = require('../middlewares/authMiddleware')
const usersRouter = require('express').Router()

usersRouter.get('/', (request, response) => {
	response.json(users)
})

usersRouter.delete('/:id', auth, (request, response) => {
	users = users.filter(item => item.id !== Number(request.params.id))
})

module.exports = usersRouter
