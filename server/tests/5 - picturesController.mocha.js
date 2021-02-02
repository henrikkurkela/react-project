const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiMatch = require('chai-match')
const app = require('../server')

chai.use(chaiHttp)
chai.use(chaiMatch)
chai.should()

describe('Pictures', () => {
	it('GET /api/pictures should return all pictures', (done) => {
		chai.request(app)
			.get('/api/pictures')
			.end((error, response) => {
				response.should.have.status(200)
				response.body.should.be.a('array')
				response.body.map((item) =>
					expect(item).to.match(/^\/assets\/img\/.*$/)
				)
				done()
			})
	})

	it('DELETE /api/pictures/:id should not allow unauthorized deletions', (done) => {
		chai.request(app)
			.delete('/api/pictures/asd.jpg')
			.set('Authorization', `Bearer FakedToken`)
			.end((error, response) => {
				response.should.have.status(401)
				response.text.should.equal('Unauthorized.')
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
						response.text.should.equal('This picture can not be removed.')
						done()
					})
			})
	})
})
