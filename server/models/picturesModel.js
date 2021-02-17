const fs = require('fs')

const imgFolder = 'assets/img'

class PicturesModel {

    getAll = async () => {
        const files = fs.readdirSync(`./public/${imgFolder}`)
        const pictures = files.map((file) => `/${imgFolder}/${file}`)
        return pictures
    }

    deleteByName = async (name) => {
        try {
            fs.unlinkSync(`./public/${imgFolder}/${name}`)
        } catch (error) {
            console.log(error)
        } finally {
            return
        }
    }
}

module.exports = PicturesModel
