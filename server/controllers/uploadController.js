const uploadRouter = require('express').Router()
const fs = require('fs')
const path = require('path')

const multer = require('multer')
const upload = multer({ dest: path.join(__dirname, '../../public/assets/img') })

const auth = require('../middlewares/authMiddleware')

uploadRouter.post('/', [upload.single('picture'), auth], (request, response) => {

    if (request.auth === null) {
        fs.unlinkSync(request.file.path)
        response.status(401).send('Unauthorized.')
    } else if (request.auth.type !== 'admin') {
        fs.unlinkSync(request.file.path)
        response.status(401).send('Unauthorized.')
    } else {
        console.log(request.file.path)
        response.status(201).json({ filename: `/assets/img/${request.file.filename}` })
    }
})

module.exports = uploadRouter
