const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')

chai.use(chaiHttp)
chai.should()

describe('Pictures', () => {
	it('GET /api/pictures should return all pictures', (done) => {
		chai.request(app)
			.get('/api/pictures')
			.end((error, response) => {
				response.should.have.status(200)
				response.body.should.be.a('array')
				done()
			})
	})
})
