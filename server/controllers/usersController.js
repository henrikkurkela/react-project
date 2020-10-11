const usersRouter = require('express').Router()

let users = require('../models/usersModel')

const auth = require('../middlewares/authMiddleware')

usersRouter.get('/', (request, response) => {
	response.json(users.map(item => { return { id: item.id, username: item.username, avatar: item.avatar } }))
})

usersRouter.patch('/:id', auth, (request, response) => {
	if (request.auth != null) {
		if (request.auth.id === Number(request.params.id)) {
			let index = users.findIndex(item => item.id === Number(request.params.id))
			switch (request.body.action) {
				case 'avatar':
					if (RegExp('/assets/avatar/[a-zA-Z0-9.]+').test(request.body.avatar)) {
						users[index].avatar = request.body.avatar
					} else {
						response.status(400).end()
					}
					break
				default:
			}
			response.json({ id: users[index].id, username: users[index].username, avatar: users[index].avatar })
		}
	}
	response.status(400)
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
