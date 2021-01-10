const fs = require('fs')

const imgFolder = './public/assets/img/'

class PicturesModel {

    getAll = async () => {
        return fs.readdirSync(imgFolder)
    }

    deleteByName = async (name) => {
        return fs.unlinkSync(`${imgFolder}/${name}`)
    }
}

module.exports = PicturesModel
