const commentsRouter = require('express').Router()

const CommentsModel = require('../models/commentsModel')

const Comments = new CommentsModel()

const auth = require('../middlewares/authMiddleware')

commentsRouter.get('/', (request, response) => {

    Comments.getAll().then((result) => {
        response.json(result)
    }).catch((error) => {
        console.log(error)
        response.status(500).send('Internal server error.')
    })
})

commentsRouter.delete('/:id', auth, (request, response) => {

    if (request.auth) {
        Comments.getAll().then((result) => {
            if (request.auth.id === result.find(item => item.id === Number(request.params.id)).userId || request.auth.type === 'admin') {
                Comments.deleteById(request.params.id).then(() => {
                    response.status(204).end()
                }).catch((error) => {
                    console.log(error)
                    response.status(500).send('Internal server error.')
                })
            } else {
                response.status(401).send('Unauthorized.')
            }
        }).catch((error) => {
            console.log(error)
            response.status(500).send('Internal server error.')
        })
    } else {
        response.status(401).send('Unauthorized.')
    }
})

commentsRouter.post('/', auth, (request, response) => {

    const newComment = { ...request.body, userId: request.auth ? request.auth.id : null }

    Comments.addComment(newComment).then((result) => {
        response.status(201).json(result)
    }).catch((error) => {
        console.log(error)
        response.status(500).send('Internal server error.')
    })
})

module.exports = commentsRouter
