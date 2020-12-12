const { DataTypes } = require('sequelize')

const connection = require('./database')

const Users = connection.define("users",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.CHAR(255),
            unique: true
        },
        username: {
            type: DataTypes.CHAR(255),
            unique: true
        },
        avatar: DataTypes.TEXT,
        password: DataTypes.TEXT,
        type: DataTypes.CHAR(255)
    },
    {
        timestamps: false
    }
)

class UsersModel {

    getAll = () => {
        return Users.findAll()
    }

    getOne = (user) => {
        return Users.findOne({ where: { ...user } }).then((user) => user.get({ plain: true }))
    }

    addUser = (newUser) => {
        return Users.create({ ...newUser })
    }

    updateAvatarOfId = (avatar, id) => {
        return Users.findByPk(id).then((user) => user.update({ avatar }))
    }

    deleteById = (id) => {
        return Users.destroy({ where: { id } })
    }

    deleteAll = () => {
        return Users.destroy({ where: {} })
    }
}

module.exports = UsersModel
