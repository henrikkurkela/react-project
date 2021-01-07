const fs = require('fs')

const imgFolder = './public/assets/img/'

const pictures = () => {

    const img = fs.readdirSync(imgFolder)
    return { pictures: img }
}

module.exports = pictures()
