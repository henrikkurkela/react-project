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

	it('POST /api/ads should reject unauthorized requests', (done) => {
		chai.request(app)
			.post('/api/ads')
			.set('Content-Type', 'application/json')
			.send({ picture: '/assets/img/photo4.jpg', href: 'http://www.google.com' })
			.end((error, response) => {
				response.should.have.status(401)
				done()
			})
	})

	it('DELETE /api/ads/:id should reject unauthorized requests', (done) => {
		chai.request(app)
			.delete('/api/ads/1')
			.end((error, response) => {
				response.should.have.status(401)
				done()
			})
	})

	it('POST /api/ads, DELETE /api/ads/:id should accept authorized requests', (done) => {
		chai.request(app)
			.post('/api/login')
			.set('Content-Type', 'application/json')
			.send({ email: 'admin@localhost.com', password: process.env.BACKEND_PASSWORD })
			.end((error, response) => {
				response.should.have.status(200)

				const token = response.body.auth

				chai.request(app)
					.post('/api/ads')
					.set('Authorization', `Bearer ${token}`)
					.set('Content-Type', 'application/json')
					.send({ picture: '/assets/img/photo4.jpg', href: 'http://www.google.com' })
					.end((error, response) => {
						response.should.have.status(201)

						const id = response.body.id

						chai.request(app)
							.delete(`/api/ads/${id}`)
							.set('Authorization', `Bearer ${token}`)
							.end((error, response) => {
								response.should.have.status(204)
								done()
							})
					})
			})
	})
})
