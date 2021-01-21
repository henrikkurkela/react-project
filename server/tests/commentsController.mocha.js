const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')

chai.use(chaiHttp)
chai.should()

describe('Comments', () => {
	it('GET /api/comments should return all comments', (done) => {
		chai.request(app)
			.get('/api/comments')
			.end((error, response) => {
				response.should.have.status(200)
				response.body.should.be.a('array')
				done()
			})
	})
})
