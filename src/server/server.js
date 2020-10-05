let users = [
		{
			id: 1,
			email: "demo@user.com",
			password: "$2b$10$BKpTs33V6xEVNG6mahZS/e5va7u5aZ9Ec994rqSOp7sPIjnrMXrFa"
		}
	]

require('dotenv').config()
const newsRouter = require('./controllers/news')
const adsRouter = require('./controllers/ads')
const commentsRouter = require('./controllers/comments')
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

app.get('/users', (request, response) => {
	response.json(users)
})

app.delete('/users/:id', (request, response) => {
	users = users.filter(item => item.id !== Number(request.params.id))
})

app.post('/login', async (request, response) => {
	const user = users.find((item) => item.email === request.body.email)
	if (user != null) {
		let correctpassword = await bcrypt.compare(request.body.password, user.password)
		if (correctpassword) {
			const token = jwt.sign(request.body.email, process.env.SECRET)
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

app.listen(3001, () => {
	console.log("Express Backend Running")
})
