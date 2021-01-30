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
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        content: DataTypes.TEXT
    }
)

class NewsModel {

    getAll = () => {
        return News.findAll()
    }

    addStory = (news) => {
        return News.create({ ...news })
    }

    patchStory = (news) => {
        return News.update({ ...news }, { where: { id: news.id } })
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

module.exports.News = News
