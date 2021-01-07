const multer = require('multer')
const upload = multer({ dest: 'public/assets/upload/' })

const uploadRouter = require('express').Router()

uploadRouter.post('/', upload.single('picture'), (request, response) => {
    console.log(request.file)
    response.status(200).end()
})

module.exports = uploadRouter
