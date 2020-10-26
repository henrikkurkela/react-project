const fs = require('fs')

const picturesFolder = './public/assets/img/'

const pictures = () => {

    const files = fs.readdirSync(picturesFolder)
    return { pictures: files }

}

module.exports = pictures()
