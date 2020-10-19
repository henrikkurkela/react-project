require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cors = require('cors')
const app = express()

const newsRouter = require('./controllers/newsController')
const adsRouter = require('./controllers/adsController')
const commentsRouter = require('./controllers/commentsController')
const usersRouter = require('./controllers/usersController')
const avatarsRouter = require('./controllers/avatarsController')

const UsersModel = require('./models/usersModel')
const connection = require('./models/database')

let Users = new UsersModel

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/news', newsRouter)
app.use('/ads', adsRouter)
app.use('/comments', commentsRouter)
app.use('/users', usersRouter)
app.use('/avatars', avatarsRouter)

app.post('/login', async (request, response) => {

	let user = null

	if (await Users.getByEmail(request.body.email) != []) {
		user = await Users.getByEmail(request.body.email)
	}

	if (user) {
		try {
			let correctpassword = await bcrypt.compare(request.body.password, user.password)
			if (correctpassword) {
				const token = jwt.sign(user, process.env.BACKEND_SECRET)
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

	let user = null

	if (await Users.getByUsername(request.body.username) != []) {
		user = await Users.getByUsername(request.body.username)
	} else if (await Users.getByEmail(request.body.email) != []) {
		user = await Users.getByEmail(request.body.email)
	}

	if (!RegExp('^[a-zA-Z0-9.]+@[a-zA-Z]+[.]{1}[a-zA-Z]+$').test(request.body.email)) {
		response.status(400).send('Invalid email')
	} else if (!RegExp('^[a-zA-Z0-9]{8,16}$').test(request.body.username)) {
		response.status(400).send('Invalid username')
	} else if (user && request.body.email && request.body.password && request.body.username) {
		let newuser = Users.addUser(request.body.email, request.body.username, '/assets/avatar/default.jpg', await bcrypt.hash(request.body.password, 10))
		response.json({ id: newuser.id, email: newuser.email, username: newuser.username, avatar: newuser.avatar })
	} else if (user) {
		response.status(400).send('User already exists')
	} else {
		response.status(400).send('Please fill out all the fields')
	}
	response.status(400).end()
})

app.get('/reset', async (request, response) => {

	try {
		await connection.query('DELETE FROM ads')
		await connection.query('INSERT INTO ads (picture, href) VALUES ("/assets/img/photo4.jpg", "http://www.google.com")')
		await connection.query('INSERT INTO ads (picture, href) VALUES ("/assets/img/photo5.jpg", "http://www.bing.com")')

		await connection.query('DELETE FROM users')
	} catch (error) {
		console.log(error)
		response.status(500).end()
	}
	response.status(200).end()

})

app.listen(process.env.BACKEND_PORT)
