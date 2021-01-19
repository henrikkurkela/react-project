const fs = require('fs')

const avatarFolder = 'assets/avatar'

const avatars = () => {

    const files = fs.readdirSync(`./public/${avatarFolder}`)
    const avatars = files.map((file) => `/${avatarFolder}/${file}`)
    return { avatars }
}

module.exports = avatars()
