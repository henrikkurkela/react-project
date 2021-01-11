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

usersRouter.patch('/:id', auth, async (request, response) => {

	if (request.auth) {
		switch (request.body.action) {
			case 'avatar':
				if (RegExp('/assets/avatar/[a-zA-Z0-9.]+').test(request.body.avatar)) {
					try {
						await Users.updateUserById({ id: request.auth.id, avatar: request.body.avatar })
						const updated = await Users.getOne({ id: request.auth.id })
						response.json({ ...updated.get({ plain: true }), password: null })
					} catch (error) {
						console.log(error)
						response.status(500).end()
					}
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

	if (request.auth) {
		Users.deleteById(request.auth.id).then(() => {
			response.status(204).end()
		}).catch((error) => {
			console.log(error)
			response.status(500).end()
		})
	} else {
		response.status(401).end()
	}
})

module.exports = usersRouter
