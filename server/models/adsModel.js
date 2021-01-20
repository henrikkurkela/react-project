const { DataTypes } = require('sequelize')

const connection = require('./database')

const Ad = connection.define('ad',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        picture: DataTypes.TEXT,
        href: DataTypes.TEXT
    }
)

class AdsModel {

    getAll = () => {
        return Ad.findAll()
    }

    addAd = (ad) => {
        return Ad.create(ad)
    }

    deleteById = (id) => {
        return Ad.destroy({ where: { id } })
    }

    deleteAll = () => {
        return Ad.destroy({ where: {} })
    }
}

module.exports = AdsModel
