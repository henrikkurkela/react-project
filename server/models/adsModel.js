const connection = require('./database')

class AdsModel {

    getAll = () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM ads', (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = AdsModel
