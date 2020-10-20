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

    if (request.auth !== null) {
        Comments.getAll().then((result) => {
            if (request.auth.id === result.find(item => item.id === Number(request.params.id)).userid) {
                Comments.deleteById(request.params.id)
                response.status(200).end()
            }
        }) 
    } else {
        response.status(401).end()
    }

})

commentsRouter.post('/', auth, (request, response) => {

    if (request.auth !== null) {
        if (request.auth.id !== request.body.userid) {
            delete request.body.userid
        }
    }

    Comments.addComment(request.body.newsid, request.body.userid, request.body.content).then((result) => {
        response.json(result)
    }).catch((error) => {
		console.log(error)
		response.status(500).end()
    })
})

module.exports = commentsRouter
