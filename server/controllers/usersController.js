let users = require('../models/usersModel')

const auth = require('../middlewares/authMiddleware')
const usersRouter = require('express').Router()

usersRouter.get('/', (request, response) => {
	response.json(users.map(item => { return { id: item.id, username: item.username, avatar: item.avatar } }))
})

usersRouter.delete('/:id', auth, (request, response) => {
	if (request.auth !== null) {
		if (request.auth.id === Number(request.params.id)) {
			users.splice(users.findIndex(item => item.id === Number(request.params.id)), 1)
			response.status(200).end()
		}
	}
	response.status(401)
})

module.exports = usersRouter
