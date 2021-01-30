const picturesRouter = require('express').Router()

const PicturesModel = require('../models/picturesModel')

const Pictures = new PicturesModel()

const auth = require('../middlewares/authMiddleware')

picturesRouter.get('/', async (request, response) => {

    try {
        const pictures = await Pictures.getAll()
        response.json(pictures)
    } catch (error) {
        console.log(error)
        response.status(500).send('Internal server error.')
    }

})

picturesRouter.delete('/:id', auth, async (request, response) => {

    if (request.auth === null) {
        response.status(401).send('Unauthorized.')
    } else if (request.auth.type !== 'admin') {
        response.status(401).send('Unauthorized.')
    } else if (RegExp('\\.jpg').test(request.params.id)) {
        response.status(403).send('This picture can not be removed.')
    } else {
        try {
            Pictures.deleteByName(request.params.id)
            response.status(204).end()
        } catch (error) {
            console.log(error)
            response.status(500).send('Internal server error.')
        }
    }
})

module.exports = picturesRouter
