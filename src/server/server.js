let users = require('./models/usersModel')
require('dotenv').config()

const newsRouter = require('./controllers/newsController')
const adsRouter = require('./controllers/adsController')
const commentsRouter = require('./controllers/commentsController')
const usersRouter = require('./controllers/usersController')
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/news', newsRouter)
app.use('/ads', adsRouter)
app.use('/comments', commentsRouter)
app.use('/users', usersRouter)

app.post('/login', async (request, response) => {
	const user = users.find((item) => item.email === request.body.email)
	if (user != null) {
		let correctpassword = await bcrypt.compare(request.body.password, user.password)
		if (correctpassword) {
			const token = jwt.sign(user, process.env.SECRET)
			response
				.status(200)
				.send({ auth: token, email: user.email, id: user.id })
		} else {
			response.status(400).end()
		}
	} else {
		response.status(400).end()
	}
})

app.post('/signup', async (request, response) => {
	const user = users.find((item) => item.email === request.body.email)
	const largestid = users.length > 0 ? users.reduce((prev, current) => { return (prev.id > current.id) ? prev : current }).id : 0
	if (!user && request.body.email && request.body.password) {
		let newuser = {
			id: largestid + 1,
			email: request.body.email,
			password: await bcrypt.hash(request.body.password, 10)
		}
		users = users.concat(newuser)
		response.json({ id: newuser.id, email: newuser.email })
	}
	response.status(400).end()
})

app.listen(3001)
