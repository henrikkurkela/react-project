const signupRouter = require('express').Router()
const bcrypt = require('bcrypt')

const UsersModel = require('../models/usersModel')

const Users = new UsersModel()

signupRouter.post('/', async (request, response) => {

    if (!RegExp('^[a-zA-Z0-9.]+@[a-zA-Z]+[.]{1}[a-zA-Z]+$').test(request.body.email)) {
        response.status(400).send('Invalid email.')
    } else if (!RegExp('^[a-zA-Z0-9]{8,16}$').test(request.body.username)) {
        response.status(400).send('Invalid username.')
    } else if (request.body.email && request.body.password && request.body.username) {
        try {
            const newuser = await Users.addUser({
                email: request.body.email,
                username: request.body.username,
                avatar: '/assets/avatar/default.jpg',
                password: await bcrypt.hash(request.body.password, 10)
            })

            const userJson = newuser.get({ plain: true })
            delete userJson.password

            response.status(201).json(userJson)
        } catch (error) {
            response.status(400).send('User already exists.')
        }
    } else {
        response.status(400).send('Please fill out all the fields')
    }

    response.status(400).end()
})

module.exports = signupRouter
