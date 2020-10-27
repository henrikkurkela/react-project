const jwt = require('jsonwebtoken')

const getAuth = (request, response, next) => {
    
    try {
        const authorization = request.headers.authorization
        
        if (authorization && RegExp('Bearer ').test(authorization)) {
            const token = authorization.substring(7)
            const decodedToken = jwt.verify(token, process.env.BACKEND_SECRET)
            request.auth = decodedToken
        } else {
            request.auth = null
        }
    } catch (error) {
        request.auth = null
    }

    next()
}

module.exports = getAuth
