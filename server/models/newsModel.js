const { DataTypes } = require('sequelize')

const connection = require('./database')

const News = connection.define('news',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        category: DataTypes.INTEGER,
        headline: DataTypes.TEXT,
        author: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                referencesKey: 'id'
            }
        },
        time: DataTypes.DATE,
        likes: DataTypes.INTEGER,
        content: DataTypes.TEXT
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)

class NewsModel {

    getAll = () => {
        return News.findAll()
    }

    addStory = (news) => {
        return News.create({ ...news })
    }

    likeStory = (id) => {
        return News.findByPk(id).then((story) => story.increment('likes'))
    }

    dislikeStory = (id) => {
        return News.findByPk(id).then((story) => story.decrement('likes'))
    }

    deleteById = (id) => {
        return News.destroy({ where: { id } })
    }

    deleteAll = () => {
        return News.destroy({ where: {} })
    }
}

module.exports = NewsModel
