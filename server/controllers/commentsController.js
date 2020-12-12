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

    Comments.getAll().then((result) => {
        if (request.auth === null) {
            response.status(401).end()
        } else if (request.auth.id === result.find(item => item.id === Number(request.params.id)).userid || request.auth.type === 'admin') {
            Comments.deleteById(request.params.id).then((result) => {
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
})

commentsRouter.post('/', auth, (request, response) => {

    if (request.auth !== null) {
        if (request.auth.id !== request.body.userid) {
            delete request.body.userid
        }
    }

    Comments.addComment({ newsid: request.body.newsid, userid: request.body.userid, content: request.body.content }).then((result) => {
        response.json(result)
    }).catch((error) => {
        console.log(error)
        response.status(500).end()
    })
})

module.exports = commentsRouter
