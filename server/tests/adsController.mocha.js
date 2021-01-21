const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')

chai.use(chaiHttp)
chai.should()

describe('Ads', () => {
	it('GET /api/ads should return all advertisements', (done) => {
		chai.request(app)
			.get('/api/ads')
			.end((error, response) => {
				response.should.have.status(200)
				response.body.should.be.a('array')
				done()
			})
	})
})
