const { DataTypes } = require('sequelize')

const connection = require('./database')

const Comments = connection.define("comments",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        newsid: {
            type: DataTypes.INTEGER,
            references: 'news',
            referencesKey: 'id'
        },
        userid: {
            type: DataTypes.INTEGER,
            references: 'users',
            referencesKey: 'id'
        },
        content: DataTypes.TEXT
    },
    {
        timestamps: false
    }
)

class CommentsModel {

    getAll = () => {
        return Comments.findAll()
    }

    addComment = (comment) => {
        return Comments.create({ ...comment })
    }

    deleteById = (id) => {
        return Comments.destroy({ where: { id } })
    }

    deleteAll = () => {
        return Comments.destroy({ where: {} })
    }
}

module.exports = CommentsModel
