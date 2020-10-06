let comments = [
    {
        id: 1,
        newsid: 1,
        content: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth."
    },
    {
        id: 2,
        newsid: 1,
        content: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain."
    },
    {
        id: 3,
        newsid: 3,
        email: "demo@user.com",
        content: "Interesting article indeed."

    }
]

const jwt = require('jsonwebtoken')
const commentsRouter = require('express').Router()

const getToken = request => {
    const authorization = request.get('authorization')

    if (authorization && RegExp('Bearer ').test(authorization)) {
        return authorization.substring(7)
    }

    return null
}

commentsRouter.get('/', (request, response) => {
    response.json(comments)
})

commentsRouter.delete('/:id', (request, response) => {
    const token = getToken(request)

    if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (decodedToken.email === comments.find(item => item.id === Number(request.params.id)).email) {
            comments = comments.filter(item => item.id !== Number(request.params.id))
            response.status(200).end()
        }
    }

    response.status(401).end()
})

commentsRouter.post('/', (request, response) => {
    const largestid = comments.reduce((prev, current) => { return (prev.id > current.id) ? prev : current }).id
    const token = getToken(request)

    if ('email' in request.body) {
        if (token) {
            const decodedToken = jwt.verify(token, process.env.SECRET)
            if (decodedToken.email !== request.body.email) {
                delete request.body.email
            }
        } else {
            delete request.body.email
        }
    }

    comments = comments.concat({ ...request.body, id: largestid + 1 })
    response.json({ ...request.body, id: largestid + 1 })
})

module.exports = commentsRouter
