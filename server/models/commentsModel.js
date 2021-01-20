const { DataTypes } = require('sequelize')

const connection = require('./database')

const Comment = connection.define('comment',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: DataTypes.TEXT
    }
)

class CommentsModel {

    getAll = () => {
        return Comment.findAll()
    }

    addComment = (comment) => {
        return Comment.create({ ...comment })
    }

    deleteById = (id) => {
        return Comment.destroy({ where: { id } })
    }

    deleteAll = () => {
        return Comment.destroy({ where: {} })
    }
}

module.exports = CommentsModel

module.exports.Comment = Comment
