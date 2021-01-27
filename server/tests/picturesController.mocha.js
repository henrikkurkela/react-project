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

	it('DELETE /api/pictures/:id should not allow deletion of .jpg files', (done) => {
		chai.request(app)
			.post('/api/login')
			.set('content-type', 'application/json')
			.send({ email: 'admin@localhost.com', password: process.env.BACKEND_PASSWORD })
			.end((error, response) => {
				response.should.have.status(200)

				const token = response.body.auth

				chai.request(app)
					.delete('/api/pictures/asd.jpg')
					.set('Authorization', `Bearer ${token}`)
					.end((error, response) => {
						response.should.have.status(403)
						done()
					})
			})
	})
})
