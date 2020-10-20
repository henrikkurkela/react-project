const connection = require('./database')

class CommentsModel {

    getAll = () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM comments', (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }

    addComment = (newsid, userid, content) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO comments (newsid, userid, content) VALUES (${newsid}, ${userid}, "${content}")`, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    connection.query(`SELECT * FROM comments WHERE id = LAST_INSERT_ID()`, (error, result) => {
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
            connection.query(`DELETE FROM comments WHERE id = "${id}"`, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }

}

module.exports = CommentsModel
