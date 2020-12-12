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
const picturesRouter = require('./controllers/picturesController')
const marketRouter = require('./controllers/marketController')
const resetRouter = require('./controllers/resetController')

const UsersModel = require('./models/usersModel')

const Users = new UsersModel()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('build'))

app.use('/api/news', newsRouter)
app.use('/api/ads', adsRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/users', usersRouter)
app.use('/api/avatars', avatarsRouter)
app.use('/api/pictures', picturesRouter)
app.use('/api/market', marketRouter)
app.use('/api/reset', resetRouter)

app.post('/api/login', async (request, response) => {

	const user = await Users.getOne({ email: request.body.email })

	if ("password" in user) {
		try {
			const correctpassword = await bcrypt.compare(request.body.password, user.password)
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

app.post('/api/signup', async (request, response) => {

	if (!RegExp('^[a-zA-Z0-9.]+@[a-zA-Z]+[.]{1}[a-zA-Z]+$').test(request.body.email)) {
		response.status(400).send('Invalid email')
	} else if (!RegExp('^[a-zA-Z0-9]{8,16}$').test(request.body.username)) {
		response.status(400).send('Invalid username')
	} else if (request.body.email && request.body.password && request.body.username) {
		try {
			const newuser = await Users.addUser({
				email: request.body.email,
				username: request.body.username,
				avatar: '/assets/avatar/default.jpg',
				password: await bcrypt.hash(request.body.password, 10)
			})
			response.json({ id: newuser.id, email: newuser.email, username: newuser.username, avatar: newuser.avatar })
		} catch (error) {
			response.status(400).send('User already exists')
		}
	} else {
		response.status(400).send('Please fill out all the fields')
	}

	response.status(400).end()
})

app.use('*', express.static('build'))
app.listen(process.env.BACKEND_PORT)
