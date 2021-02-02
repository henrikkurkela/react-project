const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')

chai.use(chaiHttp)
chai.should()

describe('Avatars', () => {
	it('GET /api/avatars should return all avatars', (done) => {
		chai.request(app)
			.get('/api/avatars')
			.end((error, response) => {
				response.should.have.status(200)
				response.body.should.be.a('array')
				done()
			})
	})
})
