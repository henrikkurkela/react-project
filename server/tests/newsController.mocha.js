const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')

chai.use(chaiHttp)
chai.should()

describe('News', () => {
	it('GET /api/news should return all news', (done) => {
		chai.request(app)
			.get('/api/news')
			.end((error, response) => {
				response.should.have.status(200)
				response.body.should.be.a('array')
				done()
			})
	})
})
