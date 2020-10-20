const usersRouter = require('express').Router()

let UsersModel = require('../models/usersModel')

let Users = new UsersModel()

const auth = require('../middlewares/authMiddleware')

usersRouter.get('/', (request, response) => {

	Users.getAll().then((result) => {
		response.json(result)
	}).catch((error) => {
		console.log(error)
		response.status(500).end()
	})
})

usersRouter.patch('/:id', auth, (request, response) => {
	
	if (request.auth != null) {
		if (request.auth.id === Number(request.params.id)) {
			switch (request.body.action) {
				case 'avatar':
					if (RegExp('/assets/avatar/[a-zA-Z0-9.]+').test(request.body.avatar)) {
						Users.updateAvatarOfId(request.body.avatar, request.auth.id).then((updated) => {
							delete updated.password
							response.json(updated)
						})
					} else {
						response.status(400).end()
					}
					break
				default:
					response.status(400).end()
			}
		}
	} else {
		response.status(400).end()
	}
})

usersRouter.delete('/:id', auth, (request, response) => {

	if (request.auth !== null) {
		if (request.auth.id === Number(request.params.id)) {
			Users.deleteById(request.auth.id)
			response.status(200).end()
		}
	}
	
	response.status(401)
})

module.exports = usersRouter