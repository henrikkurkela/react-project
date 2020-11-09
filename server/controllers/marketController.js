const marketRouter = require('express').Router()

const marketValues = []
let newValue = Math.floor(Math.random() * 100)
for (let i = 0; i < 100; i++) {
    marketValues.push({ x: i, y: newValue })
    newValue = newValue + Math.floor(Math.random() * 5) - 2
    if (newValue > 100) {
        newValue = 100
    } else if (newValue < 0) {
        newValue = 0
    }
}

setInterval(() => {
    marketValues.shift()
    marketValues.forEach((value) => value.x = value.x - 1)
    newValue = newValue + Math.floor(Math.random() * 5) - 2
    if (newValue > 100) {
        newValue = 100
    } else if (newValue < 0) {
        newValue = 0
    }
    marketValues.push({ x: marketValues.length, y: newValue })
}, 1000)

marketRouter.get('/', (request, response) => {
    response.json(marketValues)
})

module.exports = marketRouter
