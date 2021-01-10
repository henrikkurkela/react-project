const fs = require('fs')

const imgFolder = './public/assets/img/'

const pictures = async () => {

    const img = fs.readdirSync(imgFolder)
    return img
}

module.exports = pictures
