const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')

chai.use(chaiHttp)
chai.should()

describe('Users', () => {
	it('GET /api/users should return all users', (done) => {
		chai.request(app)
			.get('/api/users')
			.end((error, response) => {
				response.should.have.status(200)
				response.body.should.be.a('array')
				done()
			})
	})
})
