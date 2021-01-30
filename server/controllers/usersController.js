const usersRouter = require('express').Router()

const UsersModel = require('../models/usersModel')

const Users = new UsersModel()

const auth = require('../middlewares/authMiddleware')

usersRouter.get('/', (request, response) => {

	Users.getAll().then((result) => {
		result = result.map((user) => {
			const userJson = user.get({ plain: true })
			delete userJson.password
			return userJson
		})
		response.json(result)
	}).catch((error) => {
		console.log(error)
		response.status(500).send('Internal server error.')
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

						const userJson = updated.get({ plain: true })
						delete userJson.password

						response.json(userJson)
					} catch (error) {
						console.log(error)
						response.status(500).send('Internal server error.')
					}
				} else {
					response.status(400).end()
				}
				break
			default:
				response.status(400).end()
		}
	} else {
		response.status(401).send('Unauthorized.')
	}
})

usersRouter.delete('/:id', auth, (request, response) => {

	if (request.auth) {
		Users.deleteById(request.auth.id).then(() => {
			response.status(204).end()
		}).catch((error) => {
			console.log(error)
			response.status(500).send('Internal server error.')
		})
	} else {
		response.status(401).send('Unauthorized.')
	}
})

module.exports = usersRouter
