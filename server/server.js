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
	if (user) {
		try {
			let correctpassword = await bcrypt.compare(request.body.password, user.password)
			if (correctpassword) {
				const token = jwt.sign(user, process.env.SECRET)
				response
					.status(200)
					.send({ auth: token, email: user.email, id: user.id, username: user.username, avatar: user.avatar })
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

app.post('/signup', async (request, response) => {
	const user = users.find((item) => (item.email === request.body.email || item.username === request.body.username))
	const largestid = users.length > 0 ? users.reduce((prev, current) => { return (prev.id > current.id) ? prev : current }).id : 0

	if (!RegExp('^[a-zA-Z0-9.]+@[a-zA-Z]+[.]{1}[a-zA-Z]+$').test(request.body.email)) {
		response.status(400).send('Invalid email')
	} else if (!RegExp('^[a-zA-Z0-9]{8,16}$').test(request.body.username)) {
		response.status(400).send('Invalid username')
	} else if (!user && request.body.email && request.body.password && request.body.username) {
		let newuser = {
			id: largestid + 1,
			email: request.body.email,
			username: request.body.username,
			avatar: '/assets/avatar/default.jpg',
			password: await bcrypt.hash(request.body.password, 10)
		}
		users.push(newuser)
		response.json({ id: newuser.id, email: newuser.email, username: newuser.username, avatar: newuser.avatar })
	} else if (user) {
		response.status(400).send('User already exists')
	} else {
		response.status(400).send('Please fill out all the fields')
	}
	response.status(400).end()
})

app.listen(3001)
