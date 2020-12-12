const { DataTypes } = require('sequelize')

const connection = require('./database')

const Ads = connection.define("ads",
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
        timestamps: false
    }
)

class AdsModel {

    getAll = () => {
        return Ads.findAll()
    }

    addAd = (ad) => {
        Ads.create(ad)
    }

    deleteAll = () => {
        return Ads.destroy({ where: {} })
    }
}

module.exports = AdsModel
