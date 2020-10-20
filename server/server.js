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

const Users = new UsersModel()

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

	if (await Users.getByEmail(request.body.email) !== []) {
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

	if (await Users.getByUsername(request.body.username) !== []) {
		user = await Users.getByUsername(request.body.username)
	} else if (await Users.getByEmail(request.body.email) !== []) {
		user = await Users.getByEmail(request.body.email)
	}

	if (!RegExp('^[a-zA-Z0-9.]+@[a-zA-Z]+[.]{1}[a-zA-Z]+$').test(request.body.email)) {
		response.status(400).send('Invalid email')
	} else if (!RegExp('^[a-zA-Z0-9]{8,16}$').test(request.body.username)) {
		response.status(400).send('Invalid username')
	} else if (user && request.body.email && request.body.password && request.body.username) {
		try {
			let newuser = await Users.addUser(request.body.email, request.body.username, '/assets/avatar/default.jpg', await bcrypt.hash(request.body.password, 10))
			response.json({ id: newuser.id, email: newuser.email, username: newuser.username, avatar: newuser.avatar })
		} catch (error) {
			response.status(500).end()
		}
	} else if (user) {
		response.status(400).send('User already exists')
	} else {
		response.status(400).send('Please fill out all the fields')
	}

	response.status(400).end()
})

app.get('/reset', async (request, response) => {

	const ads = [
		{
			picture: "/assets/img/photo4.jpg",
			href: "http://www.google.com"
		},
		{
			picture: "/assets/img/photo5.jpg",
			href: "http://www.bing.com"
		}
	]

	const news = [
		{
			category: 1,
			likes: 128,
			headline: "First News Story",
			picture: "/assets/img/photo1.jpg",
			content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},
		{
			category: 2,
			likes: 256,
			headline: "Second News Story",
			picture: "/assets/img/photo3.jpg",
			content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.<br/>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
		},
		{
			category: 2,
			likes: 384,
			headline: "Third News Story",
			content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
		},
		{
			category: 2,
			likes: 512,
			headline: "Fourth News Story",
			content: "Nullam interdum mi et est rutrum, non vulputate orci convallis. Sed augue nisl, commodo nec fringilla sed, auctor sit amet justo. Suspendisse vel consectetur quam. Sed sem massa, pulvinar at eros et, pretium tempus odio. Mauris dapibus fringilla nunc id finibus. Vivamus eget volutpat eros, vel iaculis ex. Duis vel pulvinar leo. Nulla cursus tellus a tempor blandit. Aenean eget tincidunt lorem. Donec blandit massa ipsum, quis tristique risus aliquam accumsan. In hac habitasse platea dictumst. Nam ac libero nisi. Sed luctus congue risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec a nisl ut ligula ultricies malesuada.<br/>Mauris eu purus tincidunt tortor cursus feugiat at eget ex. Vivamus pellentesque quam eget ultrices lacinia. Cras in dictum enim. Nam tellus orci, faucibus id molestie non, tempor eu elit. In magna nunc, feugiat et accumsan non, semper ac ex. Praesent accumsan tempor placerat. Pellentesque convallis condimentum massa ac aliquam. Duis ut fermentum dui. Cras fermentum urna diam, in dictum diam posuere in. Donec dictum, quam ac aliquet fermentum, ligula mi aliquam sapien, eget tincidunt neque purus in tortor. Donec pharetra egestas arcu, non dignissim sem iaculis quis. Sed elementum metus ac augue gravida ultricies. Cras pretium turpis ut dapibus iaculis. Donec ac augue quis nisi blandit tempus. Aenean lobortis lacus in mattis aliquet. Sed mattis vel neque ac ullamcorper.<br/>Sed feugiat dapibus tempor. Maecenas id magna ornare, euismod risus non, imperdiet justo. Nam id varius tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent quis augue et erat ornare pretium nec ut sem. Duis tristique mauris orci, et imperdiet ipsum pretium ac. Nulla ut interdum risus, eget laoreet lacus. Donec et consequat enim. Morbi tempus eu velit nec pellentesque. Nulla eu sodales mi. In fermentum facilisis finibus."
		},
		{
			category: 1,
			likes: 640,
			headline: "Fifth News Story",
			picture: "/assets/img/photo2.jpg",
			content: "Integer tincidunt vitae sem vitae efficitur. Aliquam erat volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris dapibus lectus est, vulputate blandit justo elementum cursus. Maecenas ligula sem, malesuada nec gravida nec, dictum id risus. Integer eros massa, hendrerit sed luctus eget, sagittis sagittis leo. Phasellus aliquam tellus sit amet dui gravida ultricies et non ex. Quisque varius at mi sit amet rutrum. Fusce ultricies erat augue, eu lobortis odio viverra sit amet. Mauris maximus pulvinar lorem eu ullamcorper.<br/>Maecenas consequat lectus viverra, ullamcorper ligula vel, placerat leo. Duis at tempor tellus. Pellentesque euismod orci vitae lectus porttitor mattis. Pellentesque vel sem non nisl iaculis mollis. Curabitur dapibus dolor purus, at placerat lectus lacinia et. Morbi eget feugiat ex, quis blandit risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque non efficitur massa. Donec faucibus pharetra enim, at rutrum nisl rutrum non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
		}
	]

	try {

		connection.query('DELETE FROM comments')

		connection.query('DELETE FROM users')

		connection.query('DELETE FROM news')
		news.map((item) =>
			connection.query(`INSERT INTO news (category, likes, headline, content, picture) VALUES (${item.category}, ${item.likes}, "${item.headline}", "${item.content}", "${item.picture ? item.picture : ""}")`)
		)

		connection.query('DELETE FROM ads')
		ads.map((item) =>
			connection.query(`INSERT INTO ads (picture, href) VALUES ("${item.picture}", "${item.href}")`)
		)
	} catch (error) {
		console.log(error)
		response.status(500).end()
	}

	response.status(200).end()

})

app.listen(process.env.BACKEND_PORT)