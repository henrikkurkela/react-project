let ads = [
    {
        id: 1,
        picture: "/assets/img/img4.jpg",
        href: "http://www.google.com"
    },
    {
        id: 2,
        picture: "/assets/img/img5.jpg",
        href: "http://www.bing.com"
    }
]

const adsRouter = require('express').Router()

adsRouter.get('/', (request, response) => {
	response.json(ads)
})

module.exports = adsRouter
