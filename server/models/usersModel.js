const { DataTypes } = require('sequelize')

const connection = require('./database')

const User = connection.define('user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        avatar: DataTypes.STRING,
        password: DataTypes.STRING,
        type: DataTypes.STRING
    },
    {
        indexes: [
            { unique: true, fields: ['email'] },
            { unique: true, fields: ['username'] }
        ]
    }
)

class UsersModel {

    getAll = () => {
        return User.findAll()
    }

    getOne = (user) => {
        return User.findOne({ where: { ...user } })
    }

    addUser = (newUser) => {
        return User.create({ ...newUser })
    }

    updateUserById = (user) => {
        return User.update({ ...user }, { where: { id: user.id } })
    }

    deleteById = (id) => {
        return User.destroy({ where: { id } })
    }

    deleteAll = () => {
        return User.destroy({ where: {} })
    }
}

module.exports = UsersModel

module.exports.User = User
