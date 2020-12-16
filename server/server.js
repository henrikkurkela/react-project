require('dotenv').config()

const express = require('express')
const cors = require('cors')

const connection = require('./models/database')

const newsController = require('./controllers/newsController')
const adsController = require('./controllers/adsController')
const commentsController = require('./controllers/commentsController')
const usersController = require('./controllers/usersController')
const avatarsController = require('./controllers/avatarsController')
const picturesController = require('./controllers/picturesController')
const marketController = require('./controllers/marketController')
const resetController = require('./controllers/resetController')
const loginController = require('./controllers/loginController')
const signupController = require('./controllers/signupController')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('build'))

app.use('/api/news', newsController)
app.use('/api/ads', adsController)
app.use('/api/comments', commentsController)
app.use('/api/users', usersController)
app.use('/api/avatars', avatarsController)
app.use('/api/pictures', picturesController)
app.use('/api/market', marketController)
app.use('/api/reset', resetController)
app.use('/api/login', loginController)
app.use('/api/signup', signupController)

app.use('*', express.static('build'))
app.listen(process.env.BACKEND_PORT)

connection.sync({ alter: true })
