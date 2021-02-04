const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UsersModel = require('../models/usersModel')

const Users = new UsersModel()

loginRouter.post('/', async (request, response) => {

    let user = null

    try {
        user = await Users.getOne({ email: request.body.email })
    } catch (error) {
        console.log(error)
        user = null
    }

    if (user) {
        try {
            const correctPassword = await bcrypt.compare(request.body.password, user.password)
            if (correctPassword) {
                const token = jwt.sign(user.get({ plain: true }), process.env.BACKEND_SECRET)

                const userJson = { auth: token, ...user.get({ plain: true }) }
                delete userJson.password

                response
                    .status(200)
                    .send(userJson)
            } else {
                response.status(401).send('Incorrect email or password.')
            }
        } catch (error) {
            console.log(error)
            response.status(500).send('Internal server error.')
        }
    } else {
        response.status(401).send('Incorrect email or password.')
    }
})

module.exports = loginRouter
