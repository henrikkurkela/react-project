const { DataTypes } = require('sequelize')

const connection = require('./database')

const Ads = connection.define('ads',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        picture: DataTypes.TEXT,
        href: DataTypes.TEXT
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)

class AdsModel {

    getAll = () => {
        return Ads.findAll()
    }

    addAd = (ad) => {
        Ads.create(ad)
    }

    deleteById = (id) => {
        return Ads.destroy({ where: { id } })
    }

    deleteAll = () => {
        return Ads.destroy({ where: {} })
    }
}

module.exports = AdsModel
