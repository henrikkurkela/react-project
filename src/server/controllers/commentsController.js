let comments = require('../models/commentsModel')

const auth = require('../middlewares/authMiddleware')
const commentsRouter = require('express').Router()

commentsRouter.get('/', (request, response) => {
    response.json(comments)
})

commentsRouter.delete('/:id', auth, (request, response) => {
    if (request.auth !== null) {
        if (request.auth.email === comments.find(item => item.id === Number(request.params.id)).email) {
            comments = comments.filter(item => item.id !== Number(request.params.id))
            response.status(200).end()
        }
    }

    response.status(401).end()
})

commentsRouter.post('/', auth, (request, response) => {
    const largestid = comments.reduce((prev, current) => { return (prev.id > current.id) ? prev : current }).id

    if (request.auth !== null) {
        if (request.auth.email !== request.body.email) {
            delete request.body.email
        }
    }

    comments = comments.concat({ ...request.body, id: largestid + 1 })
    response.json({ ...request.body, id: largestid + 1 })
})

module.exports = commentsRouter
