const jwt = require('jsonwebtoken')

const getAuth = (request, response, next) => {
    
    try {
        const authorization = request.headers.authorization

        if (authorization === undefined) {
            request.auth = null
        } else if (authorization === null) {
          request.auth = null  
        } else if (RegExp('Bearer ').test(authorization) === false) {
            request.auth = null
        } else {
            const token = authorization.substring(7)
            const decodedToken = jwt.verify(token, process.env.BACKEND_SECRET)

            request.auth = decodedToken
        }
    } catch (error) {
        request.auth = null
    }

    next()
}

module.exports = getAuth
