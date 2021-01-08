const uploadRouter = require('express').Router()
const fs = require('fs')

const multer = require('multer')
const upload = multer({ dest: 'public/assets/img/' })

const auth = require('../middlewares/authMiddleware')

uploadRouter.post('/', [upload.single('picture'), auth], (request, response) => {
    if (request.auth === null) {
        fs.unlinkSync(request.file.path)
        response.status(403).send('Unauthorized')
    } else if (request.auth.type !== 'admin') {
        fs.unlinkSync(request.file.path)
        response.status(403).send('Unauthorized')
    } else {
        response.status(200).end()
    }
})

module.exports = uploadRouter
