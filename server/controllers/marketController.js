const axios = require('axios')
const marketRouter = require('express').Router()

let newValue = Math.floor(Math.random() * 100)
let apiBias = 0

const marketValues = []

for (let i = 0; i < 100; i++) {
    marketValues.push({ x: i, y: newValue })
    newValue = newValue + Math.floor(Math.random() * 5) - 2
    if (newValue > 100) {
        newValue = 100
    } else if (newValue < 0) {
        newValue = 0
    }
}

if (process.env.MARKET_API) {
    setInterval(() => {
        axios.get(process.env.MARKET_API)
            .then((response) => {
                apiBias = response.data.main.temp - 273
                console.log(`[Market] applying bias: ${apiBias}`)
                newValue = newValue + apiBias
            }).catch((error) => {
                apiBias = 0
                console.log('[Market] network error')
            })
    }, 300000)
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
