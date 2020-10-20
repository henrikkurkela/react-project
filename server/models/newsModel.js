const connection = require('./database')

class NewsModel {

    getAll = () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM news', (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }

    likeStory = (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE news SET likes = likes + 1 WHERE id = ${id}`, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    connection.query(`SELECT * FROM news WHERE id = "${id}"`, (error, result) => {
                        if (error) {
                            reject(error)
                        } else {
                            resolve({ ...result[0] })
                        }
                    })
                }
            })
        })
    }

    dislikeStory = (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE news SET likes = likes - 1 WHERE id = ${id}`, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    connection.query(`SELECT * FROM news WHERE id = "${id}"`, (error, result) => {
                        if (error) {
                            reject(error)
                        } else {
                            resolve({ ...result[0] })
                        }
                    })
                }
            })
        })
    }

}

module.exports = NewsModel

