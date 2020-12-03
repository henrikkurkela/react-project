const connection = require('./database')
const SqlString = require('sqlstring')

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

    addStory = (news) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO news (category, likes, headline, content, author) VALUES (${news.category}, ${news.likes}, ${SqlString.escape(news.headline)}, ${SqlString.escape(news.content)}, ${news.author})`, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    connection.query(`SELECT * FROM news WHERE id = LAST_INSERT_ID()`, (error, result) => {
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

    likeStory = (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE news SET likes = likes + 1 WHERE id = ${id} AND LAST_INSERT_ID(id)`, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    connection.query(`SELECT * FROM news WHERE id = LAST_INSERT_ID()`, (error, result) => {
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
            connection.query(`UPDATE news SET likes = likes - 1 WHERE id = ${id} AND LAST_INSERT_ID(id)`, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    connection.query(`SELECT * FROM news WHERE id = LAST_INSERT_ID()`, (error, result) => {
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

    deleteById = (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM news WHERE id = ${id}`, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = NewsModel

