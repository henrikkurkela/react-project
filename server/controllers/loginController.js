const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UsersModel = require('../models/usersModel')

const Users = new UsersModel()

loginRouter.post('/', async (request, response) => {

    const user = await Users.getOne({ email: request.body.email })

    if (user) {
        try {
            const correctpassword = await bcrypt.compare(request.body.password, user.password)
            if (correctpassword) {
                const token = jwt.sign(user.get({ plain: true }), process.env.BACKEND_SECRET)
                response
                    .status(200)
                    .send({ auth: token, ...user.get({ plain: true }), password: null })
            } else {
                response.status(401).send('Incorrect email or password')
            }
        } catch (error) {
            console.log(error)
            response.status(500).send('Internal server error')
        }
    } else {
        response.status(401).send('Incorrect email or password')
    }
})

module.exports = loginRouter
