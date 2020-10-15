const fs = require('fs')

const avatarFolder = './public/assets/avatar/'

const avatars = () => {

    let files = fs.readdirSync(avatarFolder)
    return { avatars: files }

}

module.exports = avatars()
