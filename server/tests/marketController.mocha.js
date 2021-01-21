const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')

chai.use(chaiHttp)
chai.should()

describe('Market', () => {
	it('GET /api/market should return stock price data', (done) => {
		chai.request(app)
			.get('/api/market')
			.end((error, response) => {
				response.should.have.status(200)
				response.body.should.be.a('array')
				done()
			})
	})
})
