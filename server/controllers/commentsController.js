const commentsRouter = require('express').Router()

const CommentsModel = require('../models/commentsModel')

const Comments = new CommentsModel()

const auth = require('../middlewares/authMiddleware')

commentsRouter.get('/', (request, response) => {

    Comments.getAll().then((result) => {
        response.json(result)
    }).catch((error) => {
        console.log(error)
        response.status(500).end()
    })
})

commentsRouter.delete('/:id', auth, (request, response) => {

    if (request.auth) {
        Comments.getAll().then((result) => {
            if (request.auth.id === result.find(item => item.id === Number(request.params.id)).userid || request.auth.type === 'admin') {
                Comments.deleteById(request.params.id).then(() => {
                    response.status(200).end()
                }).catch((error) => {
                    console.log(error)
                    response.status(500).end()
                })
            } else {
                response.status(401).end()
            }
        }).catch((error) => {
            console.log(error)
            response.status(500).end()
        })
    } else {
        response.status(401).end()
    }
})

commentsRouter.post('/', auth, (request, response) => {

    const newComment = { ...request.body, userid: request.auth ? request.auth.id : null }

    Comments.addComment(newComment).then((result) => {
        response.json(result)
    }).catch((error) => {
        console.log(error)
        response.status(500).end()
    })
})

module.exports = commentsRouter
