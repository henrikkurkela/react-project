const { DataTypes } = require('sequelize')

const connection = require('./database')

const Users = connection.define('users',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.CHAR(255)
        },
        username: {
            type: DataTypes.CHAR(255)
        },
        avatar: DataTypes.TEXT,
        password: DataTypes.TEXT,
        type: DataTypes.CHAR(255)
    },
    {
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {unique: true, fields: ['email']},
            {unique: true, fields: ['username']}
        ]
    }
)

class UsersModel {

    getAll = () => {
        return Users.findAll()
    }

    getOne = (user) => {
        return Users.findOne({ where: { ...user } })
    }

    addUser = (newUser) => {
        return Users.create({ ...newUser })
    }

    updateUserById = (user) => {
        return Users.update({ ...user }, { where: { id: user.id } })
    }

    deleteById = (id) => {
        return Users.destroy({ where: { id } })
    }

    deleteAll = () => {
        return Users.destroy({ where: {} })
    }
}

module.exports = UsersModel
