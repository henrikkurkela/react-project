const connection = require('./database')
const SqlString = require('sqlstring')

class UsersModel {

    getAll = () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users', (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }

    getById = (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE id = ${id}`, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve({ ...result[0] })
                }
            })
        })
    }

    getByEmail = (email) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE email = ${SqlString.escape(email)}`, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve({ ...result[0] })
                }
            })
        })
    }

    getByUsername = (username) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE username = ${SqlString.escape(username)}`, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve({ ...result[0] })
                }
            })
        })
    }

    addUser = (email, username, avatar, password) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO users (email, username, avatar, password) VALUES (${SqlString.escape(email)}, ${SqlString.escape(username)}, ${SqlString.escape(avatar)}, ${SqlString.escape(password)})`, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    connection.query(`SELECT * FROM users WHERE id = LAST_INSERT_ID()`, (error, result) => {
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

    updateAvatarOfId = (avatar, id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE users SET avatar = ${SqlString.escape(avatar)} WHERE id = ${id} AND LAST_INSERT_ID(id)`, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    connection.query(`SELECT * FROM users WHERE id = LAST_INSERT_ID()`, (error, result) => {
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
            connection.query(`DELETE FROM users WHERE id = ${id}`, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = UsersModel
