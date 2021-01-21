const fs = require('fs')

const imgFolder = 'assets/img'

class PicturesModel {

    getAll = async () => {
        const files = fs.readdirSync(`./public/${imgFolder}`)
        const pictures = files.map((file) => `/${imgFolder}/${file}`)
        return pictures
    }

    deleteByName = async (name) => {
        return fs.unlinkSync(`./public/${imgFolder}/${name}`)
    }
}

module.exports = PicturesModel
