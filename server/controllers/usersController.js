const usersRouter = require('express').Router()

const UsersModel = require('../models/usersModel')

const Users = new UsersModel()

const auth = require('../middlewares/authMiddleware')

usersRouter.get('/', (request, response) => {

	Users.getAll().then((result) => {
		result = result.map((user) => {
			return { ...user.get({ plain: true }), password: null }
		})
		response.json(result)
	}).catch((error) => {
		console.log(error)
		response.status(500).end()
	})
})

usersRouter.patch('/:id', auth, (request, response) => {

	if (request.auth === null) {
		response.status(401).end()
	} else if (request.auth.id === Number(request.params.id)) {
		switch (request.body.action) {
			case 'avatar':
				if (RegExp('/assets/avatar/[a-zA-Z0-9.]+').test(request.body.avatar)) {
					Users.updateUserById({ id: request.auth.id, avatar: request.body.avatar }).then(() => {
						updated = Users.getOne({ id: request.auth.id }).then((user) => {
							response.json({ ...user.get({ plain: true }), password: null })
						})
					}).catch((error) => {
						console.log(error)
						response.status(500).end()
					})
				} else {
					response.status(400).end()
				}
				break
			default:
				response.status(400).end()
		}
	} else {
		response.status(401).end()
	}
})

usersRouter.delete('/:id', auth, (request, response) => {

	if (request.auth === null) {
		response.status(401)
	} else if (request.auth.id === Number(request.params.id)) {
		Users.deleteById(request.auth.id).then(() => {
			response.status(200).end()
		}).catch((error) => {
			console.log(error)
			response.status(500).end()
		})
	} else {
		response.status(401)
	}
})

module.exports = usersRouter
