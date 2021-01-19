const uploadRouter = require('express').Router()
const fs = require('fs')

const multer = require('multer')
const upload = multer({ dest: 'public/assets/upload' })

const auth = require('../middlewares/authMiddleware')

uploadRouter.post('/', [upload.single('picture'), auth], (request, response) => {

    if (request.auth === null) {
        fs.unlinkSync(request.file.path)
        response.status(401).send('Unauthorized')
    } else if (request.auth.type !== 'admin') {
        fs.unlinkSync(request.file.path)
        response.status(401).send('Unauthorized')
    } else {
        fs.renameSync(`public/assets/upload/${request.file.filename}`, `public/assets/img/${request.file.filename}`)
        response.status(201).json({ filename: `/assets/img/${request.file.filename}` })
    }
})

module.exports = uploadRouter
